<script setup lang="ts">
const emit = defineEmits<{
  loginSuccess: [];
}>();

const message = useMessage();
const userStore = useUserStore();

let email = $ref("");
let password = $ref("");
let errorMessage = $ref("");
let loading = $ref(false);

const { mutateAsync: handleLogin } = useMutation({
  mutation: async () => {
    if (!email || !password) {
      throw new Error("请输入邮箱和密码");
    }
    return await $fetch<{ code: number; data: { token: string }; message: string }>(
      "/api/auth/login",
      { method: "POST", body: { email, password } },
    );
  },
  onSuccess(data) {
    userStore.$patch({ token: data.data.token });
    message.success("登录成功");
    emit("loginSuccess");
  },
  onError(error) {
    errorMessage = (error as any)?.data?.message || error?.message || "登录失败，请重试";
  },
});
</script>

<template>
  <div class="login-form">
    <h2 class="login-form__title">管理员登录</h2>

    <p v-if="errorMessage" class="login-form__error">{{ errorMessage }}</p>

    <form @submit.prevent="handleLogin()">
      <UiInput v-model="email" placeholder="邮箱" class="text-left" :input="{ type: 'email', autocomplete: 'email' }" />

      <div class="login-form__spacer" />

      <UiInput v-model="password" placeholder="密码" class="text-left"
        :input="{ type: 'password', autocomplete: 'current-password' }" />

      <div class="login-form__spacer" />

      <UiButton class="login-form__submit" :disabled="loading">
        {{ loading ? "登录中..." : "登录" }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped lang="less">
.login-form {
  text-align: center;
}

.login-form__title {
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
}

.login-form__error {
  margin: 0 0 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--error-color);
  background: rgb(239 68 68 / 10%);
  font-size: 0.85rem;
}

.login-form__spacer {
  height: 1rem;
}

.login-form__submit {
  width: 100%;
}
</style>
