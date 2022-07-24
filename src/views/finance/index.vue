<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-22 16:51:07
 * @FilePath: \electron-vue3-inote\src\views\addCase\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="财务收入" name="income">
      <income />
    </el-tab-pane>
    <el-tab-pane label="财务支出" name="outcome">
      <outcome />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import income from './income.vue';
import outcome from './outcome.vue';

export default defineComponent({
  name: 'finance',
  components: {
    income,
    outcome,
  },
  setup() {
    const router = useRouter()
    const state: any = reactive({
      activeName: 'income',
    })
    onMounted(() => {
      if (router.currentRoute.value.params.type) {
        state.activeName = router.currentRoute.value.params.type
      }
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>
