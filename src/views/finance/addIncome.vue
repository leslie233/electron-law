<!--
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 13:29:50
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 18:54:08
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
    :rules="rules"
    size="default"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="案件编号" prop="caseCode" style="width:100%">
          <el-input v-model="condition.caseCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收费项目" prop="incomeType" style="width:100%">
          <el-select v-model="condition.incomeType" placeholder="请选择收费项目" style="width:100%">
            <el-option label="代理费" value="代理费"></el-option>
            <el-option label="顾问费" value="顾问费"></el-option>
            <el-option label="提成费" value="提成费"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="款项类型" prop="moneyType" style="width:100%">
          <el-select v-model="condition.moneyType" placeholder="请选择款项类型" style="width:100%">
            <el-option label="现金" value="现金"></el-option>
            <el-option label="支票" value="支票"></el-option>
            <el-option label="转账" value="转账"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收费金额" prop="amount" style="width:100%">
          <el-input-number style="width:100%" v-model="condition.amount" :min="0" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收费时间" prop="incomeDate" style="width:100%">
          <el-date-picker
            style="width:100%"
            v-model="condition.incomeDate"
            type="date"
            format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="委托人" prop="custom" style="width:100%">
          <el-input v-model="condition.custom"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票号码" prop="incomeNumber" style="width:100%">
          <el-input v-model="condition.incomeNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经手人" prop="handler" style="width:100%">
          <el-input v-model="condition.handler"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark" style="width:100%">
          <el-input type="textarea" rows="4" v-model="condition.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div style="text-align: right;">
      <el-button type="primary" @click="onSubmit">保 存</el-button>
      <el-button @click="goCase">取 消</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { ElNotification  } from 'element-plus'
import { useRouter } from 'vue-router'
import { Income } from '@/service';
import { uuid } from '@/utils';

export default defineComponent({
  name: 'addIncome',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state: any = reactive({
      condition: {
        caseCode: '',
        incomeType: '',
        moneyType: '',
        amount: 0,
        incomeDate: '',
        custom: '',
        incomeNumber: '',
        handler: '',
        remark: '',
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      rules: {
        amount: [{required: true, message: '收费金额不能为空', trigger: 'blur'}],
        incomeDate: [{required: true, message: '收费时间不能为空', trigger: ['blur', 'change']}],
      },
    })
    const onSubmit = () => {
      (conditionRef.value as any).validate((valid: boolean) => {
        if (valid) {
          if (state.condition.createdAt) {
            Income.update(state.condition, {
              where: {
                uid: state.condition.uid
              },
            }).then(() => {
              ElNotification.success('收入编辑成功')
              goCase()
            }).catch(() => {
              ElNotification.error('收入编辑失败!')
            })
          } else {
            const uuidString = uuid();
            const createDefault = {
              uid: uuidString,
              ...state.condition,
            };
            Income.create(createDefault, {
              raw: true
            }).then(() => {
              ElNotification.success('收入新增成功')
              goCase()
            }).catch(() => {
              ElNotification.error('收入新增失败!')
            })
          }
        }
      })
    }
    const goCase = () => {
      router.push({
        name: 'finance',
      })
    };
    const init = (uid: any) => {
      Income.findOne({
        raw: true,
        where: {
          uid,
        },
      }).then((res) => {
        state.condition = res
      })
    }
    onMounted(() => {
      if (router.currentRoute.value.params.uid) {
        init(router.currentRoute.value.params.uid)
      }
    })
    return {
      ...toRefs(state),
      conditionRef,
      onSubmit,
      goCase,
    }
  }
})
</script>
