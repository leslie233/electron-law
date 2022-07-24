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
    <el-form-item label="收费项目" prop="incomeType" style="width:280px">
      <el-select v-model="condition.incomeType">
        <el-option label="代理费" value="代理费"></el-option>
        <el-option label="顾问费" value="顾问费"></el-option>
        <el-option label="提成费" value="提成费"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收费时间" prop="incomeDate">
      <el-date-picker
        v-model="condition.incomeDate"
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
  <el-button size="default" type="primary" @click="goAddCase">新增收入</el-button>
  <el-table :data="tableData" :border="true" style="width: 100%;margin-top:10px;">
    <el-table-column min-width="100" prop="incomeType" label="收费项目" />
    <el-table-column min-width="100" prop="amount" label="收费金额"  />
    <el-table-column width="110" :show-overflow-tooltip="true" prop="incomeDate" label="收费时间" :formatter="caseDateFormatter" />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="custom" label="委托人"  />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="caseCode" label="案件编号"  />
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
    title="收入详情"
    direction="rtl"
    size="80%"
  >
    <viewIncome :viewData="viewRow" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import moment from 'moment'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { Income, Op } from '@/service';
import viewIncome from './viewIncome.vue';

export default defineComponent({
  name: 'income',
  components: {
    viewIncome,
  },
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    let drawerRef = ref(false)
    const state: any = reactive({
      condition: {
        incomeType: '',
        incomeDate: '',
      },
      tableData: [] as unknown[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      viewRow: {},
    })
    const caseDateFormatter = (row: Record<any, any>) => {
      if (row.incomeDate === 'Invalid date') {
        return ''
      } else if (row.incomeDate) {
        return moment(row.incomeDate).format('YYYY-MM-DD')
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
          if (item === 'incomeDate') {
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
      const res = await Income.findAndCountAll({
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
        name: 'addIncome',
      })
    };
    const deleteData = (scope:any) => {
      ElMessageBox.confirm(
        '是否确定删除此收入',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          Income.update(
            {
              isDelete: true,
            },
            {
              where: {
                uid: scope.row.uid
              },
            }
          ).then(() => {
            ElNotification.success('收入删除成功')
            onSubmit()
          }).catch(() => {
            ElNotification.success('收入删除失败')
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
        name: 'addIncome',
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
