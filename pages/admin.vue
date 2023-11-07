<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">管理后台</h2>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          退出登录
        </button>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">欢迎回来，{{ user?.name }}</h3>
        <div class="space-y-2">
          <p><span class="font-medium">邮箱：</span>{{ user?.email }}</p>
          <p><span class="font-medium">角色：</span>{{ user?.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { signOut, data: user, status } = useAuth();
const router = useRouter();
// 如果未登录，跳转到登录页
if (status.value === "unauthenticated") {
  router.push("/login");
}
const handleLogout = async () => {
  await signOut();
  router.push("/login");
};
</script>
