<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-22 16:51:07
 * @FilePath: \electron-vue3-inote\src\views\addCase\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="conditionRef"
    inline
    label-position="right"
    label-width="100px"
    :model="condition"
    size="default"
  > 
    <el-form-item label="支出原因" prop="outComeReason" style="width:280px">
      <el-input v-model="condition.outComeReason"></el-input>
    </el-form-item>
    <el-form-item label="支出时间" prop="outcomeDate">
      <el-date-picker
        v-model="condition.outcomeDate"
        type="daterange"
        unlink-panels
        range-separator="-"
        format="YYYY-MM-DD"
        value-format="YYYY/MM/DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
  <el-button size="default" type="primary" @click="goAddCase">新增支出</el-button>
  <el-table :data="tableData" :border="true" style="width: 100%;margin-top:10px;">
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="outComeReason" label="支出原因" />
    <el-table-column min-width="100" prop="moneyType" label="款项类型"  />
    <el-table-column min-width="100" prop="amount" label="支出金额"  />
    <el-table-column width="110" :show-overflow-tooltip="true" prop="outcomeDate" label="支出时间" :formatter="caseDateFormatter" />
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="primary" @click="viewData(scope)" size="small">查看</el-button>
        <el-button link type="primary" @click="editData(scope)" size="small">编辑</el-button>
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
    title="支出详情"
    direction="rtl"
    size="80%"
  >
    <viewOutcome :viewData="viewRow" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import moment from 'moment'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { Outcome, Op } from '@/service';
import viewOutcome from './viewOutcome.vue';

export default defineComponent({
  name: 'income',
  components: {
    viewOutcome,
  },
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    let drawerRef = ref(false)
    const state: any = reactive({
      condition: {
        outComeReason: '',
        outcomeDate: '',
      },
      tableData: [] as unknown[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      viewRow: {},
    })
    const caseDateFormatter = (row: Record<any, any>) => {
      if (row.outcomeDate === 'Invalid date') {
        return ''
      } else if (row.outcomeDate) {
        return moment(row.outcomeDate).format('YYYY-MM-DD')
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
          if (item === 'outcomeDate') {
            filter[item] = {
              [Op.between]: [state.condition[item][0] , state.condition[item][1]]
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
      const res = await Outcome.findAndCountAll({
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
        name: 'addOutcome',
      })
    };
    const deleteData = (scope:any) => {
      ElMessageBox.confirm(
        '是否确定删除此支出',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          Outcome.update(
            {
              isDelete: true,
            },
            {
              where: {
                uid: scope.row.uid
              },
            }
          ).then(() => {
            ElNotification.success('支出删除成功')
            onSubmit()
          }).catch(() => {
            ElNotification.success('支出删除失败')
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
        name: 'addOutcome',
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
      deleteData,
      editData,
      viewData,
    }
  }
})
</script>
