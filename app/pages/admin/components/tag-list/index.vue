<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";
import AdminDataTable from "../common/AdminDataTable.vue";
import AdminModal from "../common/AdminModal.vue";
import AdminPagination from "../common/AdminPagination.vue";
import TagForm from "./TagForm.vue";

interface TagItem {
  id: number;
  name: string;
  created_at: string | null;
}

interface TagPageResult {
  list: TagItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface TagFormValue {
  name: string;
}

const pageSize = 10;
const emptyFormValue = (): TagFormValue => ({ name: "" });

const message = useMessage();

let page = $ref(1);
let keyword = $ref("");
let keywordInput = $ref("");
let editingTagId = $ref<number | null>(null);
let tagForm = $ref<TagFormValue>(emptyFormValue());
let savingTag = $ref(false);
let deletingTagId = $ref<number | null>(null);

const tagPageApi = "/api/tag/page" as string;

const query = $computed(() => ({
  page,
  pageSize,
  ...(keyword ? { keyword } : {}),
}));

const { data, error, refetch, isLoading } = $(useQuery<TagPageResult>({
  key: () => [tagPageApi, page, pageSize, keyword],
  query: async () => await $fetch(tagPageApi, { query }),
  placeholderData: () => ({
    list: [],
    total: 0,
    page: 1,
    pageSize,
  }),
}));

const pending = $computed(() => isLoading);
const tags = $computed(() => data?.list || []);
const total = $computed(() => data?.total || 0);
const pageCount = $computed(() => Math.max(1, Math.ceil(total / pageSize)));
const editModalOpen = $computed(() => editingTagId !== null);

function searchTags() {
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

async function openCreateModal() {
  editingTagId = -1;
  tagForm = emptyFormValue();
}

async function openEditModal(item: TagItem) {
  editingTagId = item.id;
  tagForm = { name: item.name };
}

function closeModal() {
  if (savingTag) return;
  editingTagId = null;
  tagForm = emptyFormValue();
}

async function saveTag() {
  if (!editingTagId) return;
  if (!tagForm.name.trim()) {
    message.warning("请填写标签名称");
    return;
  }

  savingTag = true;
  try {
    const isCreate = editingTagId === -1;

    if (isCreate) {
      await $fetch("/api/tag", {
        method: "POST",
        body: { name: tagForm.name.trim() },
      });
      message.success("标签创建成功");
    } else {
      await $fetch(`/api/tag/${editingTagId}` as string, {
        method: "PUT",
        body: { name: tagForm.name.trim() },
      });
      message.success("标签保存成功");
    }

    closeModal();
    await refetch();
  } catch {
    message.danger(editingTagId === -1 ? "标签创建失败" : "标签保存失败");
  } finally {
    savingTag = false;
  }
}

async function deleteTag(item: TagItem) {
  if (!window.confirm(`确认删除标签「${item.name}」吗？`)) return;

  deletingTagId = item.id;
  try {
    await $fetch(`/api/tag/${item.id}` as string, { method: "DELETE" });
    message.success("标签删除成功");

    if (tags.length === 1 && page > 1) {
      page -= 1;
      return;
    }

    await refetch();
  } catch {
    message.danger("标签删除失败");
  } finally {
    deletingTagId = null;
  }
}

defineExpose({ refresh: refetch });
</script>

<template>
  <section class="tag-list" aria-label="标签管理列表">
    <div class="tag-list__toolbar">
      <form class="tag-list__search" @submit.prevent="searchTags">
        <input v-model="keywordInput" type="search" placeholder="搜索标签名称" />
        <button type="submit">搜索</button>
        <button type="button" :disabled="!keyword && !keywordInput" @click="resetSearch">重置</button>
      </form>
      <ui-button class="tag-list__create" @click="openCreateModal">新增标签</ui-button>
    </div>

    <AdminDataTable
      :empty="!tags.length"
      :error="error"
      :loading="pending"
      :column-count="3"
      empty-text="暂无标签"
      min-width="620px"
    >
      <template #head>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </template>

      <tr v-for="item in tags" :key="item.id">
        <td><AdminBadge tone="muted">#{{ item.id }}</AdminBadge></td>
        <td><strong>{{ item.name }}</strong></td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div class="tag-list__actions">
            <a
              class="tag-list__link"
              href="#"
              @click.prevent="openEditModal(item)"
            >编辑</a>
            <a
              class="tag-list__link tag-list__link--danger"
              href="#"
              :aria-disabled="deletingTagId === item.id"
              @click.prevent="deleteTag(item)"
            >{{ deletingTagId === item.id ? "删除中" : "删除" }}</a>
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
      :open="editModalOpen"
      :title="editingTagId === -1 ? '新增标签' : '编辑标签'"
      width="420px"
      @close="closeModal"
    >
      <TagForm
        v-model="tagForm"
        :submitting="savingTag"
        @submit="saveTag"
        @cancel="closeModal"
      />
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
.tag-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tag-list__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tag-list__search {
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

.tag-list__search button,
.tag-list__create {
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

.tag-list__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.tag-list__link {
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

.tag-list__link--danger {
  color: #ef4444;
}

@media (max-width: 720px) {
  .tag-list__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .tag-list__search {
    flex-wrap: wrap;
  }
}
</style>
