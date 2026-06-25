<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";
import AdminDataTable from "../common/AdminDataTable.vue";
import AdminModal from "../common/AdminModal.vue";
import AdminPagination from "../common/AdminPagination.vue";

interface UserItem {
  id: number;
  name: string;
  email: string;
  avatar: string;
  site: string;
  acceptEmails: boolean;
  role: "user" | "admin";
  status: "active" | "blocked";
  created_at: string | null;
  updated_at: string | null;
}

interface UserPageResult {
  list: UserItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface UserFormValue {
  name: string;
  email: string;
  avatar: string;
  site: string;
  acceptEmails: boolean;
}

const pageSize = 10;
const emptyFormValue = (): UserFormValue => ({
  name: "",
  email: "",
  avatar: "",
  site: "",
  acceptEmails: false,
});

const message = useMessage();

let page = $ref(1);
let keyword = $ref("");
let keywordInput = $ref("");
let editingUserId = $ref<number | null>(null);
let userForm = $ref<UserFormValue>(emptyFormValue());
let savingUser = $ref(false);
let deletingUserId = $ref<number | null>(null);

const query = $computed(() => ({
  page,
  pageSize,
  ...(keyword ? { keyword } : {}),
}));

const { data, error, refetch, isLoading } = $(useQuery<UserPageResult>({
  key: () => ["/api/user", page, pageSize, keyword],
  query: async () => await $fetch("/api/user", { query }),
  placeholderData: () => ({
    list: [],
    total: 0,
    page: 1,
    pageSize,
  }),
}));

const pending = $computed(() => isLoading);
const users = $computed(() => data?.list || []);
const total = $computed(() => data?.total || 0);
const pageCount = $computed(() => Math.max(1, Math.ceil(total / pageSize)));
const editModalOpen = $computed(() => editingUserId !== null);
const isCreateMode = $computed(() => editingUserId === -1);

function searchUsers() {
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

function openCreateModal() {
  editingUserId = -1;
  userForm = emptyFormValue();
}

async function openEditModal(item: UserItem) {
  editingUserId = item.id;
  userForm = {
    name: item.name,
    email: item.email,
    avatar: item.avatar || "",
    site: item.site || "",
    acceptEmails: item.acceptEmails || false,
  };
}

function closeModal() {
  if (savingUser) return;
  editingUserId = null;
  userForm = emptyFormValue();
}

async function saveUser() {
  if (!editingUserId) return;
  if (!userForm.name.trim()) {
    message.warning("请填写昵称");
    return;
  }
  if (!userForm.email.trim()) {
    message.warning("请填写邮箱");
    return;
  }

  savingUser = true;
  try {
    if (isCreateMode.value) {
      await $fetch("/api/user", {
        method: "POST",
        body: {
          name: userForm.name.trim(),
          email: userForm.email.trim(),
          avatar: userForm.avatar.trim(),
          site: userForm.site.trim(),
          acceptEmails: userForm.acceptEmails,
        },
      });
      message.success("用户创建成功");
    } else {
      await $fetch(`/api/user/${editingUserId}` as string, {
        method: "PUT",
        body: {
          name: userForm.name.trim(),
          email: userForm.email.trim(),
          avatar: userForm.avatar.trim(),
          site: userForm.site.trim(),
          acceptEmails: userForm.acceptEmails,
        },
      });
      message.success("用户保存成功");
    }

    closeModal();
    await refetch();
  } catch {
    message.danger(isCreateMode.value ? "用户创建失败" : "用户保存失败");
  } finally {
    savingUser = false;
  }
}

async function deleteUser(item: UserItem) {
  if (!window.confirm(`确认删除用户「${item.name}」吗？`)) return;

  deletingUserId = item.id;
  try {
    await $fetch(`/api/user/${item.id}` as string, { method: "DELETE" });
    message.success("用户删除成功");

    if (users.length === 1 && page > 1) {
      page -= 1;
      return;
    }

    await refetch();
  } catch {
    message.danger("用户删除失败");
  } finally {
    deletingUserId = null;
  }
}

defineExpose({ refresh: refetch });
</script>

<template>
  <section class="user-list" aria-label="用户管理列表">
    <div class="user-list__toolbar">
      <form class="user-list__search" @submit.prevent="searchUsers">
        <input v-model="keywordInput" type="search" placeholder="搜索用户昵称" />
        <button type="submit">搜索</button>
        <button type="button" :disabled="!keyword && !keywordInput" @click="resetSearch">重置</button>
      </form>
      <ui-button class="user-list__create" @click="openCreateModal">新增用户</ui-button>
      <button class="user-list__refresh" type="button" :disabled="pending" @click="refetch()">
        {{ pending ? "刷新中..." : "刷新" }}
      </button>
    </div>

    <AdminDataTable
      :empty="!users.length"
      :error="error"
      :loading="pending"
      :column-count="8"
      empty-text="暂无用户"
      min-width="960px"
    >
      <template #head>
        <tr>
          <th>ID</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>角色</th>
          <th>状态</th>
          <th>接收邮件</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </template>

      <tr v-for="item in users" :key="item.id">
        <td>
          <AdminBadge tone="muted">#{{ item.id }}</AdminBadge>
        </td>
        <td>
          <div class="user-list__name">
            <img v-if="item.avatar" :src="item.avatar" alt="" class="user-list__avatar" />
            <strong>{{ item.name }}</strong>
          </div>
        </td>
        <td>{{ item.email }}</td>
        <td>
          <AdminBadge :tone="item.role === 'admin' ? 'info' : 'muted'">
            {{ item.role === "admin" ? "管理员" : "普通用户" }}
          </AdminBadge>
        </td>
        <td>
          <AdminBadge :tone="item.status === 'active' ? 'success' : 'danger'">
            {{ item.status === 'active' ? '正常' : '已封禁' }}
          </AdminBadge>
        </td>
        <td>
          <AdminBadge tone="muted">{{ item.acceptEmails ? "是" : "否" }}</AdminBadge>
        </td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div class="user-list__actions">
            <a
              class="user-list__link"
              href="#"
              @click.prevent="openEditModal(item)"
            >编辑</a>
            <a
              class="user-list__link user-list__link--danger"
              href="#"
              :aria-disabled="deletingUserId === item.id"
              @click.prevent="deleteUser(item)"
            >{{ deletingUserId === item.id ? "删除中" : "删除" }}</a>
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
      :title="isCreateMode ? '新增用户' : '编辑用户'"
      width="560px"
      @close="closeModal"
    >
      <div class="user-list__form">
        <div class="user-list__form-item">
          <label for="user-name">昵称</label>
          <input
            id="user-name"
            v-model="userForm.name"
            type="text"
            placeholder="请输入昵称"
          />
        </div>
        <div class="user-list__form-item">
          <label for="user-email">邮箱</label>
          <input
            id="user-email"
            v-model="userForm.email"
            type="email"
            placeholder="请输入邮箱"
          />
        </div>
        <div class="user-list__form-item">
          <label for="user-avatar">头像地址</label>
          <input
            id="user-avatar"
            v-model="userForm.avatar"
            type="text"
            placeholder="请输入头像地址"
          />
        </div>
        <div class="user-list__form-item">
          <label for="user-site">个人主页</label>
          <input
            id="user-site"
            v-model="userForm.site"
            type="text"
            placeholder="请输入个人主页地址"
          />
        </div>
        <div class="user-list__form-item">
          <label class="user-list__checkbox-label">
            <input v-model="userForm.acceptEmails" type="checkbox" />
            <span>接收邮件通知</span>
          </label>
        </div>
        <div class="user-list__form-actions">
          <button type="button" class="user-list__cancel-btn" @click="closeModal">取消</button>
          <button type="button" class="user-list__submit-btn" :disabled="savingUser" @click="saveUser">
            {{ savingUser ? (isCreateMode ? "创建中..." : "保存中...") : (isCreateMode ? "创建用户" : "保存用户") }}
          </button>
        </div>
      </div>
    </AdminModal>
  </section>
</template>

<style scoped lang="less">
.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-list__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.user-list__search {
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

.user-list__refresh {
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

.user-list__name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-list__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.user-list__actions {
  display: flex;
  gap: 0.75rem;
}

.user-list__link {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &--danger {
    color: var(--danger-color);
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.user-list__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-list__form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color2);
  }

  input[type="text"],
  input[type="email"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: inherit;
    font: inherit;
  }
}

.user-list__checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.user-list__form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.user-list__cancel-btn {
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

.user-list__submit-btn {
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
