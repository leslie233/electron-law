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
    <el-form-item label="案件编号" prop="caseCode">
      <el-input v-model="condition.caseCode"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="getAllDBNotes">清空</el-button>
    </el-form-item>
  </el-form>
  <el-button size="default" type="primary" @click="goAddCase">案件受理</el-button>
  <el-table :data="tableData" :border="true" style="width: 100%;margin-top:10px;">
    <el-table-column prop="caseCode" label="案件编号" />
    <el-table-column prop="caseType" label="案件类型"  />
    <el-table-column prop="client" label="委托人"  />
    <el-table-column prop="caseDate" label="受理日期" :formatter="caseDateFormatter" />
    <el-table-column prop="courthouse" label="受理法院"  />
    <el-table-column prop="judge" label="主审法官"  />
    <el-table-column prop="transactors" label="承办人"  />
    <el-table-column prop="lawer" label="合办律师"  />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Case, Op } from '@/service';

export default defineComponent({
  name: 'case',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state = reactive({
      condition: {
        caseCode: '',
      },
      tableData: [] as unknown[],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    })
    const caseDateFormatter = (row: Record<any, any>) => {
      if (row.caseDate === 'Invalid date') {
        return ''
      } else if (row.caseDate) {
        return row.caseDate.slice(0,10)
      } else {
        return ''
      }
    }
    const onSubmit = () => {
      console.log(55, state.condition)
      // const filter = {}
      // Object.keys(state.condition).forEach(item => {
      //   if (state.condition[item]) {
      //     filter
      //   }
      // })
      // getAllCase()
    }
    const getAllCase = async () => {
      const caseList = await Case.findAll({
        raw: true,
        where: {
          caseCode: { [Op.like]: '%C%' }
        },
        order: [['updatedAt', 'DESC']],
        attributes: [
          'uid', 
          'caseCode', 
          'caseType',
          'caseReason', 
          'client', 
          'parties', 
          'thirdPerson', 
          'caseAmount',
          'casePrice',
          'payDate',
          'caseDate',
          'openDate',
          'caseLevel',
          'isSaveMoney',
          'isSaveProof',
          'courthouse',
          'judge',
          'proofDate',
          'transactors',
          'lawer',
          'source',
          'remark',
          'updatedAt'
        ]
      });
      state.tableData = caseList
    };
    const goAddCase = () => {
      router.push({
        name: 'addCase',
      })
    };
    onMounted(() => {
      getAllCase()
    })
    return {
      ...toRefs(state),
      conditionRef,
      onSubmit,
      getAllCase,
      goAddCase,
      caseDateFormatter,
    }
  }
})
</script>
