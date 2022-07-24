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
        <el-form-item label="法官姓名" prop="judgeName" style="width:100%">
          <el-input v-model="condition.judgeName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" prop="sex" style="width:100%">
          <el-radio-group v-model="condition.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所在法院" prop="courthouse" style="width:100%">
          <el-input v-model="condition.courthouse"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职务" prop="role" style="width:100%">
          <el-select v-model="condition.role"  style="width:100%">
            <el-option label="审判员" value="审判员"></el-option>
            <el-option label="助理审判员" value="助理审判员"></el-option>
            <el-option label="书记员" value="书记员"></el-option>
          </el-select>
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
        <el-form-item label="联系地址" prop="address" style="width:100%">
          <el-input v-model="condition.address"></el-input>
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
import { Judge } from '@/service';
import { uuid } from '@/utils';

export default defineComponent({
  name: 'addJudge',
  setup() {
    const router = useRouter()
    const conditionRef = ref(null)
    const state: any = reactive({
      condition: {
        judgeName: '',
        sex: '',
        courthouse: '',
        role: '',
        phone: '',
        email: '',
        address: '',
        remark: '',
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      rules: {
        judgeName: [{required: true, message: '法官姓名不能为空', trigger: 'blur'}],
        email:[{ pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请输入正确的邮箱地址' }],
        phone:[{ pattern:/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/, message: '请输入正确的联系方式' }],
      },
    })
    const onSubmit = () => {
      (conditionRef.value as any).validate((valid: boolean) => {
        if (valid) {
          if (state.condition.createdAt) {
            Judge.update(state.condition, {
              where: {
                uid: state.condition.uid
              },
            }).then(() => {
              ElNotification.success('法官编辑成功')
              goCase()
            }).catch(() => {
              ElNotification.error('法官编辑失败!')
            })
          } else {
            const uuidString = uuid();
            const createDefault = {
              uid: uuidString,
              ...state.condition,
            };
            Judge.create(createDefault, {
              raw: true
            }).then(() => {
              ElNotification.success('法官新增成功')
              goCase()
            }).catch(() => {
              ElNotification.error('法官新增失败!')
            })
          }
        }
      })
    }
    const goCase = () => {
      router.push({
        name: 'judge',
      })
    };
    const init = (uid: any) => {
      Judge.findOne({
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
