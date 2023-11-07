<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center mb-6">管理员登录</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">邮箱</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="请输入邮箱"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">密码</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
        </div>
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {{ loading ? "登录中..." : "登录" }}
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { signIn } = useAuth();
const router = useRouter();
const form = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const error = ref("");
const handleLogin = async () => {
  if (!form.email || !form.password) {
    error.value = "请输入邮箱和密码";
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    await signIn(form);
    router.push("/admin");
  } catch (err: any) {
    error.value = err?.data?.message || "登录失败，请重试";
  } finally {
    loading.value = false;
  }
};
</script>
