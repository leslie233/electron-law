<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-20 13:25:07
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 14:07:23
 * @FilePath: \electron-vue3-inote\src\views\components\ILeft.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <header class="left">
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goHome">
      <el-icon><House /></el-icon>
      <span style="font-size:14px;margin-left:5px;">首页</span>
    </div>
    <!-- 案件管理 -->
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goPage('case')">
      <el-icon><Document /></el-icon>
      <span style="font-size:14px;margin-left:5px;">案件管理</span>
    </div>
    <!-- 客户管理 -->
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goPage('custom')">
      <el-icon><User /></el-icon>
      <span style="font-size:14px;margin-left:5px;">客户管理</span>
    </div>
    <!-- 法官管理 -->
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goPage('judge')">
      <el-icon><Avatar /></el-icon>
      <span style="font-size:14px;margin-left:5px;">法官管理</span>
    </div>
    <!-- 财务收支 -->
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goPage('finance')">
      <el-icon><Money /></el-icon>
      <span style="font-size:14px;margin-left:5px;">财务收支</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  emits: ['option-click', 'on-close'],
  setup() {
    const router = useRouter()
    const goPage = (page:string) => {
      router.push({
        name: page,
      })
    };
    // 返回首页
    const goHome = () => {
      router.push({
        name: 'home',
      })
    };
    return {
      goPage,
      goHome,
    };
  }
});
</script>

<style lang="less" scoped>
  .left {
    width: 120px;
    background-color: #F3F3F5;
  }
</style>
