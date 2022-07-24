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
        <el-form-item label="单位名称" prop="companyName" style="width:100%">
          <el-input v-model="condition.companyName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位性质" prop="companyType" style="width:100%">
          <el-select v-model="condition.companyType"  style="width:100%">
            <el-option label="党政机关" value="党政机关"></el-option>
            <el-option label="事业单位" value="事业单位"></el-option>
            <el-option label="工厂企业" value="工厂企业"></el-option>
            <el-option label="民间团体" value="民间团体"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人代表" prop="corporation" style="width:100%">
          <el-input v-model="condition.corporation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人" prop="contracter" style="width:100%">
          <el-input v-model="condition.contracter"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系地址" prop="address" style="width:100%">
          <el-input v-model="condition.address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="邮政编码" prop="sendCode" style="width:100%">
          <el-input v-model="condition.sendCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系方式" prop="phone" style="width:100%">
          <el-input v-model="condition.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="邮箱地址" prop="email" style="width:100%">
          <el-input v-model="condition.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="传真号码" prop="fax" style="width:100%">
          <el-input v-model="condition.fax"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否有效" prop="isUse" style="width:100%">
          <el-checkbox :true-label="1" :false-label="0" v-model="condition.isUse" size="default" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="委托代理" prop="isProxy" style="width:100%">
          <el-checkbox :true-label="1" :false-label="0" v-model="condition.isProxy" size="default" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="顾问律师" prop="lawer" style="width:100%">
          <el-input v-model="condition.lawer"></el-input>
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
import { Adviser } from '@/service';
import { uuid } from '@/utils';

export default defineComponent({
  name: 'addAdviser',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state: any = reactive({
      condition: {
        companyName: '',
        companyType: '',
        corporation: '',
        contracter: '',
        address: '',
        sendCode: '',
        phone: '',
        email: '',
        fax: '',
        isUse: false,
        isProxy: false,
        lawer: '',
        remark: '',
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      rules: {
        companyName: [{required: true, message: '单位名称不能为空', trigger: 'blur'}],
        email:[{ pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请输入正确的邮箱地址' }],
        phone:[{ pattern:/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/, message: '请输入正确的联系方式' }],
      },
    })
    const onSubmit = () => {
      (conditionRef.value as any).validate((valid: boolean) => {
        if (valid) {
          if (state.condition.createdAt) {
            Adviser.update(state.condition, {
              where: {
                uid: state.condition.uid
              },
            }).then(() => {
              ElNotification.success('顾问编辑成功')
              goCase()
            }).catch(() => {
              ElNotification.error('顾问编辑失败!')
            })
          } else {
            const uuidString = uuid();
            const createDefault = {
              uid: uuidString,
              ...state.condition,
            };
            Adviser.create(createDefault, {
              raw: true
            }).then(() => {
              ElNotification.success('顾问新增成功')
              goCase()
            }).catch(() => {
              ElNotification.error('顾问新增失败!')
            })
          }
        }
      })
    }
    const goCase = () => {
      router.push({
        name: 'adviser',
      })
    };
    const init = (uid: any) => {
      Adviser.findOne({
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
