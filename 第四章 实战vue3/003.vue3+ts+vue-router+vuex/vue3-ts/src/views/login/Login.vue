<template>
  <div class="logincontainer">
    <el-form
        class="loginForm"
        :model="loginModel"
        ref="loginFormRef"
        :rules="rules"
        :inline="false"
    >
      <el-form-item>
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item prop='username'>
        <el-input placeholder="请输入账户" v-model="loginModel.username"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input type='password' placeholder="请输入密码" v-model="loginModel.password"></el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
          </el-col>
          <el-col :span="8">
<!--            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>-->
             <img :src='imgSrc' @click="getImage"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="btnLayout">
        <el-row :gutter="20" class="btnGroup">
          <el-col :span="12">
            <el-button class="mybtn" @click="login" type="primary">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="mybtn">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import {ref, reactive} from 'vue'

let loginModel = reactive({
  username: '',
  password: '',
  code: ''
})
let rules = ref([])
// let imgSrc = ref('')
// let getImage = () => {}
let login = () => {}

// 组合API
import useImage from '@/composables/login/useImage';
// import useBaseLogin from '@/composables/login/useBaseLogin';
// import useLogin from '@/composables/login/useLogin';
// //基础数据
// const {loginModel, rules, loginFormRef} = useBaseLogin();

//验证码
const {imgSrc, getImage} = useImage();

// //登录
// const {login} = useLogin(loginModel);


</script>
<style scoped lang='scss'>
.logincontainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginForm {
    height: 320px;
    width: 400px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;

    .loginTitle {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .mybtn {
      width: 100%;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .el-form-item {
      .el-form-item__content {
        justify-content: center;

        .el-input {
          :deep(.el-input__inner) {
            height: 40px;
          }
        }

        .el-button {
          height: 40px;
        }
      }

      &.btnLayout {
        margin-top: 10px;

        .btnGroup {
          width: 100%;
          margin-left: 0 !important;
          margin-right: 0 !important;

          .el-col:nth-child(1) {
            padding-left: 0 !important;
          }
          .el-col:nth-child(2) {
            padding-right: 0 !important;
          }
        }
      }
    }
  }
}

</style>