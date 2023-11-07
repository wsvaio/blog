<script setup lang="ts">
import AdminTypeList from "./components/type-list/index.vue";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "分类管理",
});
</script>

<template>
  <section class="admin-types-page">
    <header class="admin-types-page__header">
      <div>
        <p class="admin-types-page__eyebrow">Types</p>
        <h1 class="admin-types-page__title">分类管理</h1>
        <p class="admin-types-page__desc">管理文章分类，支持搜索、新增、编辑和删除。</p>
      </div>
    </header>

    <div class="admin-types-page__card">
      <ClientOnly>
        <AdminTypeList />
        <template #fallback>
          <p class="admin-types-page__loading">分类列表加载中...</p>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped lang="less">
.admin-types-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.admin-types-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-types-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-types-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-types-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.admin-types-page__loading {
  margin: 0;
  color: var(--text-color3, var(--text-color));
}

@media (max-width: 640px) {
  .admin-types-page__card {
    padding: 1rem;
  }
}
</style>
