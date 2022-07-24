<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 18:54:08
 * @FilePath: \electron-vue3-inote\src\views\addCase\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row>
    <el-col :span="8" class="view-span">
      <span>案件编号: </span>
      <span>{{ viewData.caseCode }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>收费项目: </span>
      <span>{{ viewData.incomeType }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>款项类型: </span>
      <span>{{ viewData.moneyType }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>收费金额: </span>
      <span>{{ viewData.amount }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>收费时间: </span>
      <span>{{ viewData.incomeDate!== 'Invalid date'?moment(viewData.incomeDate).format('YYYY/MM/DD'): '' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>委托人: </span>
      <span>{{ viewData.custom }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>发票号码: </span>
      <span>{{ viewData.incomeNumber }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>经手人: </span>
      <span>{{ viewData.handler }}</span>
    </el-col>
    <el-col :span="24" class="view-span">
      <span>备注: </span>
      <span>{{ viewData.remark }}</span>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: ['viewData'],
  setup(props) {
    const { viewData } = toRefs(props)
    const state: any = reactive({
      moment,
    })

    return {
      ...toRefs(state),
      viewData,
    }
  }
})
</script>
<style lang="less" scoped>
  .view-span {
    margin-bottom: 15px;
    font-size: 14px;
    :last-child {
      color: #909399;
    }
  }
</style>
