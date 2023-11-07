<script setup lang="ts">
import AdminArticleForm from "./components/article-form/index.vue";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "管理面板",
});
</script>

<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <p class="admin-page__eyebrow">Admin</p>
      <h1 class="admin-page__title">写文章</h1>
      <p class="admin-page__desc">填写标题、分类、标签和正文后发布文章。</p>
    </header>

    <div class="admin-page__card">
      <AdminArticleForm />
    </div>
  </section>
</template>

<style scoped lang="less">
.admin-page {
  max-width: 960px;
}

.admin-page__header {
  margin-bottom: 1.25rem;
}

.admin-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

@media (max-width: 640px) {
  .admin-page__card {
    padding: 1rem;
  }
}
</style>
