<script setup lang="ts">
import AdminUserList from "./components/user-list/index.vue";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "用户管理",
});
</script>

<template>
  <section class="admin-users-page">
    <header class="admin-users-page__header">
      <div>
        <p class="admin-users-page__eyebrow">Users</p>
        <h1 class="admin-users-page__title">用户管理</h1>
        <p class="admin-users-page__desc">管理博客用户，支持搜索、新增、编辑和删除。</p>
      </div>
    </header>

    <div class="admin-users-page__card">
      <ClientOnly>
        <AdminUserList />
        <template #fallback>
          <p class="admin-users-page__loading">用户列表加载中...</p>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped lang="less">
.admin-users-page__header {
  margin-bottom: 1.25rem;
}

.admin-users-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-users-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-users-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-users-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.admin-users-page__loading {
  margin: 0;
  color: var(--text-color3, var(--text-color));
}

@media (max-width: 640px) {
  .admin-users-page__card {
    padding: 1rem;
  }
}
</style>
