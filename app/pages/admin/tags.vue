<script setup lang="ts">
import AdminTagList from "./components/tag-list/index.vue";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "标签管理",
});
</script>

<template>
  <section class="admin-tags-page">
    <header class="admin-tags-page__header">
      <div>
        <p class="admin-tags-page__eyebrow">Tags</p>
        <h1 class="admin-tags-page__title">标签管理</h1>
        <p class="admin-tags-page__desc">管理文章标签，支持搜索、新增、编辑和删除。</p>
      </div>
    </header>

    <div class="admin-tags-page__card">
      <ClientOnly>
        <AdminTagList />
        <template #fallback>
          <p class="admin-tags-page__loading">标签列表加载中...</p>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped lang="less">
.admin-tags-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.admin-tags-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-tags-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-tags-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-tags-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.admin-tags-page__loading {
  margin: 0;
  color: var(--text-color3, var(--text-color));
}

@media (max-width: 640px) {
  .admin-tags-page__card {
    padding: 1rem;
  }
}
</style>
