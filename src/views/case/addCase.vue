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
        <el-form-item label="案件类型" prop="caseType" style="width:100%">
          <el-select v-model="condition.caseType" placeholder="请选择案件类型">
            <el-option label="刑事案件" value="刑事案件"></el-option>
            <el-option label="民事案件" value="民事案件"></el-option>
            <el-option label="行政案件" value="行政案件"></el-option>
            <el-option label="经济案件" value="经济案件"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="案由" prop="caseReason" style="width:100%">
          <el-input v-model="condition.caseReason"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="委托人" prop="client" style="width:100%">
          <el-input v-model="condition.client"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="对方当事人" prop="parties" style="width:100%">
          <el-input v-model="condition.parties"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="第三人" prop="thirdPerson" style="width:100%">
          <el-input v-model="condition.thirdPerson"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="诉讼标的" prop="caseAmount" style="width:100%">
          <el-input-number v-model="condition.caseAmount" :min="0" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="代理费用" prop="casePrice" style="width:100%">
          <el-input-number v-model="condition.casePrice" :min="0" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收费日期" prop="payDate" style="width:100%">
          <el-date-picker
            v-model="condition.payDate"
            type="date"
            format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="受理日期" prop="caseDate" style="width:100%">
          <el-date-picker
            v-model="condition.caseDate"
            type="date"
            format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开庭日期" prop="openDate" style="width:100%">
          <el-date-picker
            v-model="condition.openDate"
            type="date"
            format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="审级" prop="caseLevel" style="width:100%">
          <el-select v-model="condition.caseLevel" placeholder="请选择审级">
            <el-option label="一审" value="一审"></el-option>
            <el-option label="二审" value="二审"></el-option>
            <el-option label="终审" value="终审"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="财产保全" prop="isSaveMoney" style="width:100%">
          <el-checkbox v-model="condition.isSaveMoney" size="default" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证据保全" prop="isSaveProof" style="width:100%">
          <el-checkbox v-model="condition.isSaveProof" size="default" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="受理法院" prop="courthouse" style="width:100%">
          <el-input v-model="condition.courthouse"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主审法官" prop="judge" style="width:100%">
          <el-input v-model="condition.judge"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="举证期限" prop="proofDate" style="width:100%">
          <el-date-picker
            v-model="condition.proofDate"
            type="date"
            format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="承办人" prop="transactors" style="width:100%">
          <el-input v-model="condition.transactors"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合办律师" prop="lawer" style="width:100%">
          <el-input v-model="condition.lawer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="案件来源" prop="source" style="width:100%">
          <el-input v-model="condition.source"></el-input>
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
import { Case } from '@/service';
import { uuid } from '@/utils';

export default defineComponent({
  name: 'addCase',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state: any = reactive({
      condition: {
        caseCode: '',
        caseType: '',
        caseReason: '',
        client: '',
        parties: '',
        thirdPerson: '',
        caseAmount: 0,
        casePrice: 0,
        payDate: '',
        caseDate: '',
        openDate: '',
        caseLevel: '',
        isSaveMoney: false,
        isSaveProof: false,
        courthouse: '',
        judge: '',
        proofDate: '',
        transactors: '',
        lawer: '',
        source: '',
        remark: '',
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      rules: {
        caseCode: [{required: true, message: '案件编号不能为空', trigger: 'blur'}],
        caseReason: [{required: true, message: '案由不能为空', trigger: ['blur', 'change']}],
      },
    })
    const onSubmit = () => {
      (conditionRef.value as any).validate((valid: boolean) => {
        if (valid) {
          const uuidString = uuid();
          const createDefault = {
            uid: uuidString,
            ...state.condition,
          };
          Case.create(createDefault, {
            raw: true
          }).then(() => {
            ElNotification.success('案件受理成功')
          }).catch(() => {
            ElNotification.error('案件受理失败!')
          })
        }
      })
    }
    const goCase = () => {
      router.push({
        name: 'case',
      })
    };
    onMounted(() => {
      // init()
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
