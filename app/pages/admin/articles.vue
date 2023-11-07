<script setup lang="ts">
import AdminArticleForm from "./components/article-form/index.vue";
import AdminArticleList from "./components/article-list/index.vue";
import AdminModal from "./components/common/AdminModal.vue";

interface ArticleListExpose {
  refresh: () => Promise<unknown>;
}

let createModalOpen = $ref(false);
const articleListRef = useTemplateRef<ArticleListExpose>("articleListRef");

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "文章管理",
});

function openCreateModal() {
  createModalOpen = true;
}

function closeCreateModal() {
  createModalOpen = false;
}

async function handleArticleCreated() {
  closeCreateModal();
  await articleListRef.value?.refresh();
}
</script>

<template>
  <section class="admin-articles-page">
    <header class="admin-articles-page__header">
      <div>
        <p class="admin-articles-page__eyebrow">Articles</p>
        <h1 class="admin-articles-page__title">文章管理</h1>
        <p class="admin-articles-page__desc">查看已发布文章，支持搜索、分页和跳转预览。</p>
      </div>
      <button class="admin-articles-page__create" type="button" @click="openCreateModal">新增文章</button>
    </header>

    <div class="admin-articles-page__card">
      <ClientOnly>
        <AdminArticleList ref="articleListRef" />
        <template #fallback>
          <p class="admin-articles-page__loading">文章列表加载中...</p>
        </template>
      </ClientOnly>
    </div>

    <AdminModal :open="createModalOpen" title="新增文章" width="860px" @close="closeCreateModal">
      <AdminArticleForm
        :redirect-after-created="false"
        submit-text="新增文章"
        submitting-text="新增中..."
        @created="handleArticleCreated"
      />
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
// .admin-articles-page {
//   max-width: 1200px;
// }

.admin-articles-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.admin-articles-page__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--primary-color);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.admin-articles-page__title {
  margin: 0;
  font-size: 2rem;
}

.admin-articles-page__desc {
  margin: 0.5rem 0 0;
  color: var(--text-color2, var(--text-color));
  line-height: 1.8;
}

.admin-articles-page__create {
  flex: 0 0 auto;
  padding: 0.65rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 999px;
  background: var(--primary-color);
  color: white;
  font: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}

.admin-articles-page__card {
  padding: 1.5rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 12px 30px rgb(0 0 0 / 8%);
}

.admin-articles-page__loading {
  margin: 0;
  color: var(--text-color3, var(--text-color));
}

@media (max-width: 640px) {
  .admin-articles-page__header {
    align-items: stretch;
    flex-direction: column;
  }

  .admin-articles-page__create {
    width: 100%;
  }

  .admin-articles-page__card {
    padding: 1rem;
  }
}
</style>
