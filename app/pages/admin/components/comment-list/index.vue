<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";
import AdminDataTable from "../common/AdminDataTable.vue";
import AdminModal from "../common/AdminModal.vue";
import AdminPagination from "../common/AdminPagination.vue";

interface CommentItem {
  id: number;
  articleId: number;
  parentId: number | null;
  replyToId: number | null;
  nickname: string;
  email: string;
  website: string;
  avatar: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  likeCount: number;
  created_at: string | null;
  updated_at: string | null;
  articleTitle: string;
}

interface CommentPageResult {
  list: CommentItem[];
  total: number;
  page: number;
  pageSize: number;
}

const pageSize = 10;

const message = useMessage();

let page = $ref(1);
let keyword = $ref("");
let keywordInput = $ref("");
let editingCommentId = $ref<number | null>(null);
let commentStatus = $ref<CommentItem["status"]>("pending");
let savingComment = $ref(false);
let deletingCommentId = $ref<number | null>(null);

const query = $computed(() => ({
  page,
  pageSize,
  ...(keyword ? { keyword } : {}),
}));

const { data, error, refetch, isLoading } = $(useQuery<CommentPageResult>({
  key: () => ["/api/comment/admin/page", page, pageSize, keyword],
  query: async () => await $fetch("/api/comment/admin/page", { query }),
  placeholderData: () => ({
    list: [],
    total: 0,
    page: 1,
    pageSize,
  }),
}));

const pending = $computed(() => isLoading);
const comments = $computed(() => data?.list || []);
const total = $computed(() => data?.total || 0);
const pageCount = $computed(() => Math.max(1, Math.ceil(total / pageSize)));

function searchComments() {
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

function getStatusTone(status: CommentItem["status"]) {
  switch (status) {
    case "approved": return "success";
    case "rejected": return "danger";
    case "pending": return "warning";
  }
}

function getStatusText(status: CommentItem["status"]) {
  switch (status) {
    case "approved": return "已通过";
    case "rejected": return "已拒绝";
    case "pending": return "待审核";
  }
}

function openEditModal(item: CommentItem) {
  editingCommentId = item.id;
  commentStatus = item.status;
}

function closeModal() {
  if (savingComment) return;
  editingCommentId = null;
}

async function saveComment() {
  if (!editingCommentId) return;

  savingComment = true;
  try {
    await $fetch(`/api/comment/admin/${editingCommentId}` as string, {
      method: "PUT",
      body: { status: commentStatus },
    });
    message.success("评论状态更新成功");
    closeModal();
    await refetch();
  } catch {
    message.danger("评论状态更新失败");
  } finally {
    savingComment = false;
  }
}

async function approveComment(item: CommentItem) {
  try {
    await $fetch(`/api/comment/admin/${item.id}` as string, {
      method: "PUT",
      body: { status: "approved" },
    });
    message.success("已通过该评论");
    await refetch();
  } catch {
    message.danger("操作失败");
  }
}

async function rejectComment(item: CommentItem) {
  try {
    await $fetch(`/api/comment/admin/${item.id}` as string, {
      method: "PUT",
      body: { status: "rejected" },
    });
    message.success("已拒绝该评论");
    await refetch();
  } catch {
    message.danger("操作失败");
  }
}

async function deleteComment(item: CommentItem) {
  if (!window.confirm(`确认删除该评论吗？`)) return;

  deletingCommentId = item.id;
  try {
    await $fetch(`/api/comment/admin/${item.id}` as string, { method: "DELETE" });
    message.success("评论删除成功");

    if (comments.length === 1 && page > 1) {
      page -= 1;
      return;
    }

    await refetch();
  } catch {
    message.danger("评论删除失败");
  } finally {
    deletingCommentId = null;
  }
}

defineExpose({ refresh: refetch });
</script>

<template>
  <section class="comment-list" aria-label="评论管理列表">
    <div class="comment-list__toolbar">
      <form class="comment-list__search" @submit.prevent="searchComments">
        <input v-model="keywordInput" type="search" placeholder="搜索评论内容" />
        <button type="submit">搜索</button>
        <button type="button" :disabled="!keyword && !keywordInput" @click="resetSearch">重置</button>
      </form>
      <button class="comment-list__refresh" type="button" :disabled="pending" @click="refetch()">
        {{ pending ? "刷新中..." : "刷新" }}
      </button>
    </div>

    <AdminDataTable
      :empty="!comments.length"
      :error="error"
      :loading="pending"
      :column-count="8"
      empty-text="暂无评论"
      min-width="1100px"
    >
      <template #head>
        <tr>
          <th>ID</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>文章</th>
          <th>内容</th>
          <th>状态</th>
          <th>点赞</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </template>

      <tr v-for="item in comments" :key="item.id">
        <td>
          <AdminBadge tone="muted">#{{ item.id }}</AdminBadge>
        </td>
        <td>
          <div class="comment-list__name">
            <img v-if="item.avatar" :src="item.avatar" alt="" class="comment-list__avatar" />
            <span>{{ item.nickname }}</span>
            <a v-if="item.website" :href="item.website" target="_blank" class="comment-list__site">
              <span class="i-carbon:link" />
            </a>
          </div>
        </td>
        <td>{{ item.email }}</td>
        <td class="comment-list__article">
          <NuxtLink :to="`/article/${item.articleId}`" target="_blank" class="comment-list__link">
            {{ item.articleTitle }}
          </NuxtLink>
        </td>
        <td>{{ item.content }}</td>
        <td>
          <AdminBadge :tone="getStatusTone(item.status) as any">{{ getStatusText(item.status) }}</AdminBadge>
        </td>
        <td>
          <AdminBadge tone="muted">{{ item.likeCount }}</AdminBadge>
        </td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div class="comment-list__actions">
            <a
              v-if="item.status === 'pending'"
              class="comment-list__action comment-list__action--success"
              href="#"
              @click.prevent="approveComment(item)"
            >通过</a>
            <a
              v-if="item.status === 'pending'"
              class="comment-list__action comment-list__action--danger"
              href="#"
              @click.prevent="rejectComment(item)"
            >拒绝</a>
            <a
              class="comment-list__action"
              href="#"
              @click.prevent="openEditModal(item)"
            >编辑</a>
            <a
              class="comment-list__action comment-list__action--danger"
              href="#"
              :aria-disabled="deletingCommentId === item.id"
              @click.prevent="deleteComment(item)"
            >{{ deletingCommentId === item.id ? "删除中" : "删除" }}</a>
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

    <AdminModal
      :open="editingCommentId !== null"
      title="编辑评论状态"
      width="420px"
      @close="closeModal"
    >
      <div class="comment-list__form">
        <div class="comment-list__form-item">
          <label for="comment-status">评论状态</label>
          <select id="comment-status" v-model="commentStatus">
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
        <div class="comment-list__form-actions">
          <button type="button" class="comment-list__cancel-btn" @click="closeModal">取消</button>
          <button type="button" class="comment-list__submit-btn" :disabled="savingComment" @click="saveComment">
            {{ savingComment ? "保存中..." : "保存" }}
          </button>
        </div>
      </div>
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-list__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.comment-list__search {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.6rem;

  input {
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: inherit;
    font: inherit;
  }

  button {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: inherit;
    font: inherit;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
}

.comment-list__refresh {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
}

.comment-list__name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-list__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-list__site {
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-size: 0.9em;
}

.comment-list__article {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comment-list__link {
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.comment-list__actions {
  display: flex;
  gap: 0.75rem;
}

.comment-list__action {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &--success {
    color: var(--success-color, #10b981);
  }

  &--danger {
    color: var(--danger-color, #ef4444);
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.comment-list__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-list__form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color2);
  }

  select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
}

.comment-list__form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.comment-list__cancel-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
}

.comment-list__submit-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
