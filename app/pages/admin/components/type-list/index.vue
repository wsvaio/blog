<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";
import AdminDataTable from "../common/AdminDataTable.vue";
import AdminModal from "../common/AdminModal.vue";
import AdminPagination from "../common/AdminPagination.vue";
import TypeForm from "./TypeForm.vue";

interface TypeItem {
  id: number;
  name: string;
  icon: string;
  description: string;
  order: number;
  created_at: string | null;
}

interface TypePageResult {
  list: TypeItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface TypeFormValue {
  name: string;
  icon: string;
  description: string;
  order: number;
}

const pageSize = 10;
const emptyFormValue = (): TypeFormValue => ({
  name: "",
  icon: "",
  description: "",
  order: 0,
});

const message = useMessage();

let page = $ref(1);
let keyword = $ref("");
let keywordInput = $ref("");
let editingTypeId = $ref<number | null>(null);
let typeForm = $ref<TypeFormValue>(emptyFormValue());
let savingType = $ref(false);
let deletingTypeId = $ref<number | null>(null);

const typePageApi = "/api/type/page" as string;

const query = $computed(() => ({
  page,
  pageSize,
  ...(keyword ? { keyword } : {}),
}));

const { data, error, refetch, isLoading } = $(useQuery<TypePageResult>({
  key: () => [typePageApi, page, pageSize, keyword],
  query: async () => await $fetch(typePageApi, { query }),
  placeholderData: () => ({
    list: [],
    total: 0,
    page: 1,
    pageSize,
  }),
}));

const pending = $computed(() => isLoading);
const types = $computed(() => data?.list || []);
const total = $computed(() => data?.total || 0);
const pageCount = $computed(() => Math.max(1, Math.ceil(total / pageSize)));
const editModalOpen = $computed(() => editingTypeId !== null);

function searchTypes() {
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
  editingTypeId = -1; // sentinel for "create"
  typeForm = emptyFormValue();
}

async function openEditModal(item: TypeItem) {
  editingTypeId = item.id;
  typeForm = {
    name: item.name,
    icon: item.icon || "",
    description: item.description || "",
    order: item.order ?? 0,
  };
}

function closeModal() {
  if (savingType) return;
  editingTypeId = null;
  typeForm = emptyFormValue();
}

async function saveType() {
  if (!editingTypeId) return;
  if (!typeForm.name.trim()) {
    message.warning("请填写分类名称");
    return;
  }

  savingType = true;
  try {
    const isCreate = editingTypeId === -1;

    if (isCreate) {
      await $fetch("/api/type", {
        method: "POST",
        body: {
          name: typeForm.name.trim(),
          icon: typeForm.icon.trim(),
          description: typeForm.description.trim(),
          order: typeForm.order,
        },
      });
      message.success("分类创建成功");
    } else {
      await $fetch(`/api/type/${editingTypeId}` as string, {
        method: "PUT",
        body: {
          name: typeForm.name.trim(),
          icon: typeForm.icon.trim(),
          description: typeForm.description.trim(),
        },
      });
      message.success("分类保存成功");
    }

    closeModal();
    await refetch();
  } catch {
    message.danger(editingTypeId === -1 ? "分类创建失败" : "分类保存失败");
  } finally {
    savingType = false;
  }
}

async function deleteType(item: TypeItem) {
  if (!window.confirm(`确认删除分类「${item.name}」吗？`)) return;

  deletingTypeId = item.id;
  try {
    await $fetch(`/api/type/${item.id}` as string, { method: "DELETE" });
    message.success("分类删除成功");

    if (types.length === 1 && page > 1) {
      page -= 1;
      return;
    }

    await refetch();
  } catch {
    message.danger("分类删除失败");
  } finally {
    deletingTypeId = null;
  }
}

</script>

<template>
  <section class="type-list" aria-label="分类管理列表">
    <div class="type-list__toolbar">
      <form class="type-list__search" @submit.prevent="searchTypes">
        <input v-model="keywordInput" type="search" placeholder="搜索分类名称" />
        <button type="submit">搜索</button>
        <button type="button" :disabled="!keyword && !keywordInput" @click="resetSearch">重置</button>
      </form>
      <ui-button class="type-list__create" @click="openCreateModal">新增分类</ui-button>
      <button class="type-list__refresh" type="button" :disabled="pending" @click="refetch()">
        {{ pending ? "刷新中..." : "刷新" }}
      </button>
    </div>

    <AdminDataTable
      :empty="!types.length"
      :error="error"
      :loading="pending"
      :column-count="7"
      empty-text="暂无分类"
      min-width="780px"
    >
      <template #head>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>图标</th>
          <th>排序</th>
          <th>描述</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </template>

      <tr v-for="item in types" :key="item.id">
        <td><AdminBadge tone="muted">#{{ item.id }}</AdminBadge></td>
        <td><strong>{{ item.name }}</strong></td>
        <td>{{ item.icon || "-" }}</td>
        <td>{{ item.order }}</td>
        <td class="type-list__desc">{{ item.description || "-" }}</td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div class="type-list__actions">
            <a
              class="type-list__link"
              href="#"
              @click.prevent="openEditModal(item)"
            >编辑</a>
            <a
              class="type-list__link type-list__link--danger"
              href="#"
              :aria-disabled="deletingTypeId === item.id"
              @click.prevent="deleteType(item)"
            >{{ deletingTypeId === item.id ? "删除中" : "删除" }}</a>
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
      :title="editingTypeId === -1 ? '新增分类' : '编辑分类'"
      width="540px"
      @close="closeModal"
    >
      <TypeForm
        v-model="typeForm"
        :submitting="savingType"
        @submit="saveType"
        @cancel="closeModal"
      />
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
.type-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.type-list__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.type-list__search {
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

.type-list__search button,
.type-list__create,
.type-list__refresh {
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

.type-list__desc {
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type-list__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.type-list__link {
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

.type-list__link--danger {
  color: #ef4444;
}

@media (max-width: 720px) {
  .type-list__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .type-list__search {
    flex-wrap: wrap;
  }
}
</style>
