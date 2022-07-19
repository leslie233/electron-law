<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-19 19:05:56
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
    <el-form-item label="MQ名" prop="mqconfigName">
      <el-input v-model="condition.mqconfigName"></el-input>
    </el-form-item>
    <el-form-item label="MQ状态" prop="mqconfigState">
      <el-select
        v-model="condition.mqconfigState" 
        placeholder="请选择MQ状态">
        <el-option label="草稿" value="0"></el-option>
        <el-option label="激活" value="1"></el-option>
        <el-option label="停用" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="MQ类型" prop="mqconfigType">
      <el-select v-model="condition.mqconfigType" placeholder="请选择MQ类型">
        <el-option label="输入" value="0"></el-option>
        <el-option label="输出" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="getAllDBNotes">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Case } from '@/service';
import { uuid } from '@/utils';

export default defineComponent({
  name: 'MQList',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state = reactive({
      condition: {
        mqconfigName: '',
        mqconfigState: '',
        mqconfigType: '',
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    })
    const onSubmit = () => {
      const uuidString = uuid();
      const createDefault = {
        uid: uuidString,
        ...state.condition,
      };
      Case.create(createDefault, {
        raw: true
      });
    }
    const getAllDBNotes = async () => {
      const notesAllList = await Case.findAll({
        raw: true,
        order: [['updatedAt', 'DESC']],
        attributes: ['uid', 'mqconfigName', 'mqconfigState', 'mqconfigType', 'updatedAt']
      });
      console.log(888, notesAllList)
    };
    onMounted(() => {
      // init()
    })
    return {
      ...toRefs(state),
      conditionRef,
      onSubmit,
      getAllDBNotes,
    }
  }
})
</script>
