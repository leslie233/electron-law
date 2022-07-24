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
      <span>案件类型: </span>
      <span>{{ viewData.caseType }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>案由: </span>
      <span>{{ viewData.caseReason }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>委托人: </span>
      <span>{{ viewData.client }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>委托人是: </span>
      <span>{{ viewData.clientFrom }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>对方当事人: </span>
      <span>{{ viewData.parties }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>第三人: </span>
      <span>{{ viewData.partthirdPersonies }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>诉讼标的: </span>
      <span>{{ viewData.caseAmount }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>代理费用: </span>
      <span>{{ viewData.casePrice }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>收费日期: </span>
      <span>{{ viewData.payDate!== 'Invalid date'?moment(viewData.payDate).format('YYYY/MM/DD'): '' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>受理日期: </span>
      <span>{{ viewData.caseDate!== 'Invalid date'?moment(viewData.caseDate).format('YYYY/MM/DD'): '' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>开庭日期: </span>
      <span>{{ viewData.openDate!== 'Invalid date'?moment(viewData.openDate).format('YYYY/MM/DD'): '' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>审级: </span>
      <span>{{ viewData.caseLevel }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>财产保全: </span>
      <span>{{ viewData.isSaveMoney === 1 ? '是' : '否' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>证据保全: </span>
      <span>{{ viewData.isSaveProof === 1 ? '是' : '否' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>受理法院: </span>
      <span>{{ viewData.courthouse }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>主审法官: </span>
      <span>{{ viewData.judge }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>举证期限: </span>
      <span>{{ viewData.proofDate!== 'Invalid date'?moment(viewData.proofDate).format('YYYY/MM/DD'): '' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>承办人: </span>
      <span>{{ viewData.transactors }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>合办律师: </span>
      <span>{{ viewData.lawer }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>案件来源: </span>
      <span>{{ viewData.source }}</span>
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
