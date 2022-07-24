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
    <el-form-item label="单位名称" prop="companyName" style="width:280px">
      <el-input v-model="condition.companyName"></el-input>
    </el-form-item>
    <el-form-item label="法人代表" prop="corporation" style="width:280px">
      <el-input v-model="condition.corporation"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="contracter" style="width:280px">
      <el-input v-model="condition.contracter"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
  <el-button size="default" type="primary" @click="goAddCase">新增顾问</el-button>
  <el-table :data="tableData" :border="true" style="width: 100%;margin-top:10px;">
    <el-table-column min-width="100" prop="companyName" label="单位名称"  />
    <el-table-column min-width="100" prop="companyType" label="单位性质"  />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="corporation" label="法人代表"  />
    <el-table-column prop="contracter" label="联系人"  />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="phone" label="联系方式"  />
    <el-table-column min-width="100" :show-overflow-tooltip="true" prop="address" label="联系地址"  />
    <el-table-column min-width="100" prop="lawer" label="顾问律师"  />
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
    title="顾问详情"
    direction="rtl"
    size="80%"
  >
    <viewAdviser :viewData="viewRow" />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { Adviser, Op } from '@/service';
import viewAdviser from './viewAdviser.vue';

export default defineComponent({
  name: 'adviser',
  components: {
    viewAdviser,
  },
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    let drawerRef = ref(false)
    const state: any = reactive({
      condition: {
        companyName: '',
        corporation: '',
        contracter: '',
      },
      tableData: [] as unknown[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      viewRow: {},
    })
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
          filter[item] = {
            [Op.like]: `%${state.condition[item]}%`
          }
        }
      })
      getAllCase(filter)
    }
    const getAllCase = async (filter = {}) => {
      const res = await Adviser.findAndCountAll({
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
        name: 'addAdviser',
      })
    };
    const deleteData = (scope:any) => {
      ElMessageBox.confirm(
        `是否确定删除：${scope.row.companyName}?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          Adviser.update(
            {
              isDelete: true,
            },
            {
              where: {
                uid: scope.row.uid
              },
            }
          ).then(() => {
            ElNotification.success('顾问删除成功')
            onSubmit()
          }).catch(() => {
            ElNotification.success('顾问删除失败')
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
        name: 'addAdviser',
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
      handleCurrentChange,
      deleteData,
      editData,
      viewData,
    }
  }
})
</script>
