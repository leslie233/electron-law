<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-22 16:51:07
 * @FilePath: \electron-vue3-inote\src\views\addCase\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
    <el-tab-pane label="全部案件" name="all"></el-tab-pane>
    <el-tab-pane label="日收案" name="day"></el-tab-pane>
    <el-tab-pane label="月收案" name="month"></el-tab-pane>
    <el-tab-pane label="年收案" name="year"></el-tab-pane>
  </el-tabs>
  <el-form
    ref="conditionRef"
    inline
    label-position="right"
    label-width="100px"
    :model="condition"
    size="default"
  >
    <el-form-item label="案件编号" prop="caseCode" style="width:280px">
      <el-input v-model="condition.caseCode"></el-input>
    </el-form-item>
    <el-form-item label="委托人" prop="client" style="width:280px">
      <el-input v-model="condition.client"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status" style="width:280px">
      <el-select v-model="condition.status">
        <el-option label="已结案" value="1"></el-option>
        <el-option label="未结案" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeName!=='all'" label="收案日期" prop="caseDate" style="width:280px">
      <el-date-picker
        v-if="activeName==='day'"
        v-model="condition.caseDate"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY/MM/DD"
      />
      <el-date-picker
        v-if="activeName==='month'"
        v-model="condition.caseDate"
        type="month"
        format="YYYY-MM"
        value-format="YYYY/MM/DD"
      />
      <el-date-picker
        v-if="activeName==='year'"
        v-model="condition.caseDate"
        type="year"
        format="YYYY"
        value-format="YYYY/MM/DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
  <el-button size="default" type="primary" @click="goAddCase">案件受理</el-button>
  <el-table :data="tableData" :border="true" style="width: 100%;margin-top:10px;">
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="caseCode" label="案件编号" />
    <el-table-column min-width="100" prop="caseType" label="案件类型"  />
    <el-table-column prop="client" label="委托人"  />
    <el-table-column width="110" :show-overflow-tooltip="true" prop="caseDate" label="受理日期" :formatter="caseDateFormatter" />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="courthouse" label="受理法院"  />
    <el-table-column min-width="100" prop="judge" label="主审法官"  />
    <el-table-column prop="transactors" label="承办人"  />
    <el-table-column min-width="100" prop="lawer" label="合办律师"  />
    <el-table-column
      prop="status"
      label="状态"
      fixed="right"
      width="90"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.status === '1' ? '' : 'success'"
          disable-transitions
          >{{ scope.row.status === '1' ? '已结案' : '未结案' }}
        </el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button link type="primary" @click="viewData(scope)" size="small">查看</el-button>
        <el-button link type="primary" @click="editData(scope)" size="small">编辑</el-button>
        <el-button v-if="scope.row.status !== '1'" link type="primary" @click="finishCase(scope, '1')" size="small">结案</el-button>
        <el-button v-else link type="primary" @click="finishCase(scope, '2')" size="small">取消结案</el-button>
        <el-button link type="primary" @click="deleteData(scope)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top:10px;float: right">
    <el-pagination 
      background 
      layout="total, prev, pager, next, jumper"
      :total="total" 
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      @current-change="handleCurrentChange"
    />
  </div>
  <el-drawer
    v-model="drawerRef"
    title="案件详情"
    direction="rtl"
    size="80%"
  >
    <viewCase :viewData="viewRow" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import moment from 'moment'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { Case, Op } from '@/service';
import viewCase from './viewCase.vue';

export default defineComponent({
  name: 'case',
  components: {
    viewCase,
  },
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    let drawerRef = ref(false)
    const state: any = reactive({
      condition: {
        caseCode: '',
        client: '',
        caseDate: '',
        status: '',
      },
      tableData: [] as unknown[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      activeName: 'all',
      viewRow: {},
    })
    const caseDateFormatter = (row: Record<any, any>) => {
      if (row.caseDate === 'Invalid date') {
        return ''
      } else if (row.caseDate) {
        return moment(row.caseDate).format('YYYY-MM-DD')
      } else {
        return ''
      }
    }
    const reset = () => {
      (conditionRef.value as any).resetFields()
    }
    const onSubmit = () => {
      const filter: Record<any, any> = {}
      filter.isDelete = {
        [Op.not]: true
      }
      Object.keys(state.condition).forEach(item => {
        if (state.condition[item]) {
          if (item === 'caseDate') {
            if (state.activeName === 'day') {
              filter[item] = {
                [Op.between]: [`${state.condition[item]} 00:00:00`, `${state.condition[item]} 24:00:00`]
              }
            }
            if (state.activeName === 'month') {
              filter[item] = {
                 [Op.between]: [moment(state.condition[item]).startOf('month').format('YYYY/MM/DD'), moment(state.condition[item]).endOf('month').format('YYYY/MM/DD')]
              }
            }
            if (state.activeName === 'year') {
              filter[item] = {
                 [Op.between]: [moment(state.condition[item]).startOf('year').format('YYYY/MM/DD'), moment(state.condition[item]).endOf('year').format('YYYY/MM/DD')]
              }
            }
          } else {
            filter[item] = {
              [Op.like]: `%${state.condition[item]}%`
            }
          }
        }
      })
      getAllCase(filter)
    }
    const getAllCase = async (filter = {}) => {
      const res = await Case.findAndCountAll({
        raw: true,
        where: filter,
        order: [['createdAt', 'DESC']],
        limit: state.pageSize,
        offset: (state.currentPage - 1) * state.pageSize,
      });
      state.tableData = res.rows
      state.total = res.count
    };
    const handleCurrentChange = (val: number) => {
      state.currentPage = val
      onSubmit()
    }
    const goAddCase = () => {
      router.push({
        name: 'addCase',
      })
    };
    const tabChange = (val: any) => {
      reset()
      if (val === 'all') {
        state.condition.caseDate = ''
      } else {
        state.condition.caseDate = moment(new Date()).format('YYYY/MM/DD')
      }
      onSubmit()
    }
    const deleteData = (scope:any) => {
      ElMessageBox.confirm(
        `是否确定删除案件编号：${scope.row.caseCode}?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          Case.update(
            {
              isDelete: true,
            },
            {
              where: {
                uid: scope.row.uid
              },
            }
          ).then(() => {
            ElNotification.success('案件删除成功')
            onSubmit()
          }).catch(() => {
            ElNotification.success('案件删除失败')
          })
        })
        .catch(() => {
        })
    }
    const finishCase = (scope:any, type: string) => {
      ElMessageBox.confirm(
        `${type === '1' ? '是否确定结案' : '是否确定取消结案'}，案件编号：${scope.row.caseCode}?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          Case.update(
            {
              status: type,
            },
            {
              where: {
                uid: scope.row.uid
              },
            }
          ).then(() => {
            ElNotification.success(`${type === '1' ? '案件结案成功' : '取消结案成功'}`)
            onSubmit()
          }).catch(() => {
            ElNotification.success(`${type === '1' ? '案件结案失败' : '取消结案失败'}`)
          })
        })
        .catch(() => {
        })
    }
    const viewData = (scope:any) => {
      state.viewRow = scope.row
      drawerRef.value = true
    }
    const editData = (scope:any) => {
      router.push({
        name: 'addCase',
        params: {uid: scope.row.uid}
      })
    }
    onMounted(() => {
      onSubmit()
    })
    return {
      ...toRefs(state),
      conditionRef,
      drawerRef,
      onSubmit,
      getAllCase,
      goAddCase,
      reset,
      caseDateFormatter,
      handleCurrentChange,
      tabChange,
      finishCase,
      deleteData,
      editData,
      viewData,
    }
  }
})
</script>
