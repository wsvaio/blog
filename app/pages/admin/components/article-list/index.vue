<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";
import AdminDataTable from "../common/AdminDataTable.vue";
import AdminModal from "../common/AdminModal.vue";
import AdminPagination from "../common/AdminPagination.vue";
import ArticleEditForm from "./ArticleEditForm.vue";

interface ArticleType {
  id: number;
  name: string;
}

interface ArticleTag {
  id: number;
  name: string;
}

interface ArticleStats {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

interface ArticleItem {
  id: number;
  title: string;
  content?: string;
  created_at: string | null;
  typeId?: number;
  type?: ArticleType | null;
  tags?: ArticleTag[];
  stats?: ArticleStats | null;
}

interface ArticlePageResult {
  list: ArticleItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface ArticleEditorValue {
  title: string;
  content: string;
  typeId: number | null;
  tagIds: number[];
}

const pageSize = 10;
const emptyEditorValue = (): ArticleEditorValue => ({
  title: "",
  content: "",
  typeId: null,
  tagIds: [],
});

const message = useMessage();

let page = $ref(1);
let keyword = $ref("");
let keywordInput = $ref("");
let editingArticleId = $ref<number | null>(null);
let editForm = $ref<ArticleEditorValue>(emptyEditorValue());
let loadingArticle = $ref(false);
let savingArticle = $ref(false);
let deletingArticleId = $ref<number | null>(null);

const query = $computed(() => ({
  page,
  pageSize,
  ...(keyword ? { keyword } : {}),
}));

const { data, error, refetch, isLoading } = $(useQuery<ArticlePageResult>({
  key: () => ['/api/article/page', page, pageSize, keyword],
  query: async () => await $fetch('/api/article/page', { query }),
  placeholderData: () => ({
    list: [],
    total: 0,
    page: 1,
    pageSize,
  }),
}));

const { data: types } = useFetch<ArticleType[]>("/api/type", {
  default: () => [],
  server: false,
});
const { data: tags } = useFetch<ArticleTag[]>("/api/tag", {
  default: () => [],
  server: false,
});

const pending = $computed(() => isLoading);
const articles = $computed(() => data?.list || []);
const total = $computed(() => data?.total || 0);
const pageCount = $computed(() => Math.max(1, Math.ceil(total / pageSize)));
const editModalOpen = $computed(() => editingArticleId !== null);

function searchArticles() {
  keyword = keywordInput.trim();
  page = 1;
}

function resetSearch() {
  keywordInput = "";
  keyword = "";
  page = 1;
}

function previousPage() {
  page = Math.max(1, page - 1);
}

function nextPage() {
  page = Math.min(pageCount, page + 1);
}

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toEditorValue(article: ArticleItem): ArticleEditorValue {
  return {
    title: article.title,
    content: article.content || "",
    typeId: article.type?.id || article.typeId || null,
    tagIds: article.tags?.map(tag => tag.id) || [],
  };
}

async function openEditModal(article: ArticleItem) {
  editingArticleId = article.id;
  editForm = toEditorValue(article);

  if (article.content) return;

  loadingArticle = true;
  try {
    const detail = await $fetch<ArticleItem>(`/api/article/${article.id}` as "/api/article/:id");
    editForm = toEditorValue(detail);
  } catch {
    message.danger("文章详情加载失败");
    closeEditModal();
  } finally {
    loadingArticle = false;
  }
}

function closeEditModal() {
  if (savingArticle) return;
  editingArticleId = null;
  editForm = emptyEditorValue();
}

async function saveArticle() {
  if (!editingArticleId) return;
  if (!editForm.title.trim() || !editForm.content.trim() || !editForm.typeId) {
    message.warning("请填写标题、分类和正文");
    return;
  }

  savingArticle = true;
  try {
    await $fetch(`/api/article/${editingArticleId}` as "/api/article/:id", {
      method: "PUT",
      body: {
        title: editForm.title,
        content: editForm.content,
        typeId: editForm.typeId,
        tagIds: editForm.tagIds,
      },
    });
    message.success("文章保存成功");
    closeEditModal();
    await refetch();
  } catch {
    message.danger("文章保存失败");
  } finally {
    savingArticle = false;
  }
}

async function deleteArticle(article: ArticleItem) {
  if (!window.confirm(`确认删除「${article.title}」吗？删除后将不在列表显示。`)) return;

  deletingArticleId = article.id;
  try {
    await $fetch(`/api/article/${article.id}` as "/api/article/:id", {
      method: "DELETE",
    });
    message.success("文章删除成功");

    if (articles.length === 1 && page > 1) {
      page -= 1;
      return;
    }

    await refetch();
  } catch {
    message.danger("文章删除失败");
  } finally {
    deletingArticleId = null;
  }
}

defineExpose({ refresh: refetch });
</script>

<template>
  <section class="article-list" aria-label="文章管理列表">
    <div class="article-list__toolbar">
      <form class="article-list__search" @submit.prevent="searchArticles">
        <input v-model="keywordInput" type="search" placeholder="搜索文章或标签" />
        <button type="submit">搜索</button>
        <button type="button" :disabled="!keyword && !keywordInput" @click="resetSearch">重置</button>
      </form>
      <button class="article-list__refresh" type="button" :disabled="pending" @click="refetch()">
        {{ pending ? "刷新中..." : "刷新" }}
      </button>
    </div>

    <AdminDataTable
      :empty="!articles.length"
      :error="error"
      :loading="pending"
      :column-count="6"
      empty-text="暂无文章"
      min-width="860px"
    >
      <template #head>
        <tr>
          <th>标题</th>
          <th>分类</th>
          <th>标签</th>
          <th>统计</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </template>

      <tr v-for="item in articles" :key="item.id">
        <td>
          <div class="article-list__title">
            <span>#{{ item.id }}</span>
            <strong>{{ item.title }}</strong>
          </div>
        </td>
        <td>
          <AdminBadge v-if="item.type?.name">{{ item.type.name }}</AdminBadge>
          <AdminBadge v-else tone="muted">-</AdminBadge>
        </td>
        <td>
          <div class="article-list__tags">
            <AdminBadge v-for="tag in item.tags || []" :key="tag.id">{{ tag.name }}</AdminBadge>
            <AdminBadge v-if="!item.tags?.length" tone="muted">无标签</AdminBadge>
          </div>
        </td>
        <td>
          <div class="article-list__stats">
            <AdminBadge>阅 {{ item.stats?.viewCount || 0 }}</AdminBadge>
            <AdminBadge>赞 {{ item.stats?.likeCount || 0 }}</AdminBadge>
            <AdminBadge>评 {{ item.stats?.commentCount || 0 }}</AdminBadge>
          </div>
        </td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div class="article-list__actions">
            <NuxtLink class="article-list__link" :to="`/article/${item.id}`">查看</NuxtLink>
            <a
              class="article-list__link"
              href="#"
              :aria-disabled="loadingArticle || savingArticle"
              @click.prevent="openEditModal(item)"
            >编辑</a>
            <a
              class="article-list__link article-list__link--danger"
              href="#"
              :aria-disabled="deletingArticleId === item.id"
              @click.prevent="deleteArticle(item)"
            >
              {{ deletingArticleId === item.id ? "删除中" : "删除" }}
            </a>
          </div>
        </td>
      </tr>
    </AdminDataTable>

    <AdminPagination
      :page="page"
      :page-count="pageCount"
      :total="total"
      :page-size="pageSize"
      :loading="pending"
      @previous="previousPage"
      @next="nextPage"
    />

    <AdminModal :open="editModalOpen" title="编辑文章" width="860px" @close="closeEditModal">
      <p v-if="loadingArticle" class="article-list__loading-detail">文章详情加载中...</p>
      <ArticleEditForm
        v-else
        v-model="editForm"
        :types="types"
        :tags="tags"
        :submitting="savingArticle"
        @submit="saveArticle"
        @cancel="closeEditModal"
      />
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
.article-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-list__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.article-list__search {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.6rem;

  input {
    box-sizing: border-box;
    min-width: 0;
    flex: 1;
    height: 2.4rem;
    padding: 0 0.85rem;
    border: 1px solid var(--border-color7, var(--border-color));
    border-radius: 999px;
    outline: none;
    background: transparent;
    color: inherit;
    font: inherit;

    &:focus,
    &:hover {
      border-color: var(--primary-color);
    }
  }
}

.article-list__search button,
.article-list__refresh {
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &:not(:disabled):hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
}

.article-list__title {
  display: flex;
  max-width: 320px;
  flex-direction: column;
  gap: 0.25rem;

  span {
    color: var(--text-color3, var(--text-color));
    font-size: 0.78rem;
  }

  strong {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.article-list__tags,
.article-list__stats,
.article-list__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.article-list__actions {
  align-items: center;
}

.article-list__link {
  color: var(--primary-color);
  cursor: pointer;
  text-decoration: none;

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.55;
    pointer-events: none;
  }

  &:hover {
    text-decoration: underline;
  }
}

.article-list__link--danger {
  color: #ef4444;
}

.article-list__loading-detail {
  margin: 0;
  color: var(--text-color3, var(--text-color));
  text-align: center;
}

@media (max-width: 720px) {
  .article-list__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .article-list__search {
    flex-wrap: wrap;
  }
}
</style>
