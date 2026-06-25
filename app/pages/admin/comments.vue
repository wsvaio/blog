<script setup lang="ts">
import AdminCommentList from "./components/comment-list/index.vue";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "评论管理",
});
</script>

<template>
  <section class="admin-comments-page">
    <header class="admin-comments-page__header">
      <div>
        <p class="admin-comments-page__eyebrow">Comments</p>
        <h1 class="admin-comments-page__title">评论管理</h1>
        <p class="admin-comments-page__desc">管理博客评论，支持搜索、审核和删除。</p>
      </div>
    </header>

    <div class="admin-comments-page__card">
      <ClientOnly>
        <AdminCommentList />
        <template #fallback>
          <p class="admin-comments-page__loading">评论列表加载中...</p>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped lang="less">
.admin-comments-page__header {
  margin-bottom: 1.25rem;
}

.admin-comments-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-comments-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-comments-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-comments-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.admin-comments-page__loading {
  margin: 0;
  color: var(--text-color3, var(--text-color));
}

@media (max-width: 640px) {
  .admin-comments-page__card {
    padding: 1rem;
  }
}
</style>
