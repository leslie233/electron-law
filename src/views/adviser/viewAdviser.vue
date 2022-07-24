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
      <span>单位名称: </span>
      <span>{{ viewData.companyName }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>单位性质: </span>
      <span>{{ viewData.companyType }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>法人代表: </span>
      <span>{{ viewData.corporation }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>联系人: </span>
      <span>{{ viewData.contracter }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>联系地址: </span>
      <span>{{ viewData.address }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>邮政编码: </span>
      <span>{{ viewData.sendCode }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>联系方式: </span>
      <span>{{ viewData.phone }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>邮箱地址: </span>
      <span>{{ viewData.email }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>传真号码: </span>
      <span>{{ viewData.fax }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>是否有效: </span>
      <span>{{ viewData.isUse === 1 ? '是' : '否' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>委托代理: </span>
      <span>{{ viewData.isProxy === 1 ? '是' : '否' }}</span>
    </el-col>
    <el-col :span="8" class="view-span">
      <span>顾问律师: </span>
      <span>{{ viewData.lawer }}</span>
    </el-col>
    <el-col :span="24" class="view-span">
      <span>备注: </span>
      <span>{{ viewData.remark }}</span>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: ['viewData'],
  setup(props) {
    const { viewData } = toRefs(props)
    const state: any = reactive({
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
