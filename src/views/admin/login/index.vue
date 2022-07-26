<script lang="ts" setup>
import { useRequest } from "vue-request";
const router = useRouter();

const loginFormRef = $ref<T>();
const form = reactive<T>({});
const rules = {
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 1, max: 16, message: "密码长度为1-16位", trigger: "blur" }
  ]
};
function handleLogin() {
  loginFormRef.validate(valid => {
    if (!valid) return;
    router.push({ name: "home" });
  });
}


const { run, loading } = useRequest(Promise.resolve("hh"), {
  onSuccess(data) {

  },
  manual: true,
});




</script>

<template tag="div" class="root">
	<div>后台管理系统</div>
	<div></div>

	<el-form ref="loginFormRef" v-loading="loading" size="large" :model="form" :rules="rules"
		:disabled="loading">
		<div>欢迎登陆</div>
		<el-form-item class="mt-25px" prop="username">
			<el-input v-model.trim="form.username" prefix-icon="i-user" maxlength="32" placeholder="请输入账号" clearable></el-input>
		</el-form-item>

		<el-form-item prop="password">
			<el-input v-model.trim="form.password" prefix-icon="i-key" maxlength="16" show-password placeholder="请输入密码"
				clearable @keyup.enter.exact="handleLogin"></el-input>
		</el-form-item>
		<el-form-item size="default">
			<el-checkbox v-model="form.persist">
				自动登录
			</el-checkbox>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="btn" :loading="form.loading" @click="handleLogin">
				登 录
			</el-button>
		</el-form-item>


		<div flex="1"></div>
		<div class="version">
			v-1.0.0
		</div>
	</el-form>


	<div>
		<Copyright></Copyright>
	</div>
</template>

<style lang="less" scoped>
.btn {
  width: 100%;
  border-radius: 100px;
}

.root {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 8fr 2fr;
  justify-content: center;
  background: url("@/assets/background.svg") no-repeat center / cover, #f1f1f1;

  &>* {
    &:first-child {
      color: #337ecc;
      filter: brightness(50%);
      font-size: 42px;
    }

    &:nth-child(2) {

      background: url("@/assets/notFound/31.svg") no-repeat center / cover, #a0cfff;
      justify-self: flex-end;
      z-index: 1;
    }

    &:nth-child(3) {
      padding: 75px;
      background: white;
      display: flex;
      flex-flow: column;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);

      &>* {
        &:first-child {
          color: #337ecc;
          font-weight: bold;
          font-size: 24px;
        }

        &.version {
          font-size: 14px;
          text-align: center;
          color: rgba(0, 0, 0, 0.5);
        }
      }

    }

    &:last-child {

      text-align: center;

    }

    &:nth-child(2),
    &:nth-child(3) {
      width: 500px;
      box-sizing: border-box;
    }

    &:last-child,
    &:first-child {
      grid-column: span 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>