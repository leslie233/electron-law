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
    <div class="icon-pointer icon flex-items" style="width:unset;padding-left:5px;" @click="goCase">
      <el-icon><Document /></el-icon>
      <span style="font-size:14px;margin-left:5px;">案件管理</span>
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
    // 案件管理
    const goCase = () => {
      router.push({
        name: 'case',
      })
    };
    // 返回首页
    const goHome = () => {
      router.push({
        name: 'index',
      })
    };
    return {
      goCase,
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
