<script setup lang="ts">
import AdminModal from "./AdminModal.vue";
import LoginForm from "./LoginForm.vue";

const userStore = useUserStore();
const message = useMessage();

let dropdownOpen = $ref(false);
let loginModalOpen = $ref(false);
let profileModalOpen = $ref(false);
let fetchingSession = $ref(false);

const isLoggedIn = $computed(() => !!userStore.token);
const displayName = $computed(() => userStore.name || "未登录");
const displayAvatar = $computed(() => userStore.avatar);

// fetch session when token exists but user info is empty
async function fetchSession() {
  if (!userStore.token || userStore.name) return;
  fetchingSession = true;
  try {
    const res = await $fetch<{ code: number; data: { id: number; name: string; email: string; avatar: string; role: string } }>(
      "/api/auth/session",
      { headers: { Authorization: `Bearer ${userStore.token}` } },
    );
    userStore.$patch({
      id: String(res.data.id),
      name: res.data.name,
      email: res.data.email,
      avatar: res.data.avatar,
    });
  } catch {
    // token invalid, clear it
    userStore.$patch({ token: "" });
  } finally {
    fetchingSession = false;
  }
}

// fetch on mount
if (import.meta.client) {
  fetchSession();
}

function toggleDropdown() {
  dropdownOpen = !dropdownOpen;
}

function closeDropdown() {
  dropdownOpen = false;
}

function openLogin() {
  closeDropdown();
  loginModalOpen = true;
}

function openProfile() {
  closeDropdown();
  profileModalOpen = true;
}

function handleLogout() {
  closeDropdown();
  userStore.$patch({
    token: "",
    id: "",
    avatar: "",
    name: "",
    email: "",
  });
  message.info("已退出登录");
}

function handleLoginSuccess() {
  loginModalOpen = false;
  fetchSession();
}
</script>

<template>
  <div class="user-panel">
    <button class="user-panel__trigger" :disabled="fetchingSession" @click="toggleDropdown">
      <img v-if="displayAvatar" class="user-panel__avatar" :src="displayAvatar" alt="" />
      <span v-else class="user-panel__avatar-placeholder i-carbon:user-avatar" />
      <span class="user-panel__name">{{ displayName }}</span>
      <span class="user-panel__arrow i-carbon:chevron-up" :class="{ 'user-panel__arrow--open': dropdownOpen }" />
    </button>

    <Transition name="user-dropdown">
      <div v-if="dropdownOpen" class="user-panel__dropdown" @click.self="closeDropdown">
        <div class="user-panel__menu" role="menu">
          <template v-if="isLoggedIn">
            <button class="user-panel__menu-item" role="menuitem" @click="openProfile">
              <span class="i-carbon:user" />
              <span>个人信息</span>
            </button>
            <div class="user-panel__divider" />
            <button class="user-panel__menu-item user-panel__menu-item--danger" role="menuitem" @click="handleLogout">
              <span class="i-carbon:logout" />
              <span>退出登录</span>
            </button>
          </template>
          <template v-else>
            <button class="user-panel__menu-item" role="menuitem" @click="openLogin">
              <span class="i-carbon:login" />
              <span>登录</span>
            </button>
          </template>
        </div>
      </div>
    </Transition>

    <!-- Login Modal -->
    <AdminModal :open="loginModalOpen" title="登录" width="400px" @close="loginModalOpen = false">
      <LoginForm @login-success="handleLoginSuccess" />
    </AdminModal>

    <!-- Profile Modal -->
    <AdminModal :open="profileModalOpen" title="个人信息" width="420px" @close="profileModalOpen = false">
      <div class="user-panel__profile">
        <div class="user-panel__profile-avatar">
          <img v-if="displayAvatar" :src="displayAvatar" alt="" />
          <span v-else class="i-carbon:user-avatar" />
        </div>
        <dl class="user-panel__profile-info">
          <div>
            <dt>名称</dt>
            <dd>{{ userStore.name || "-" }}</dd>
          </div>
          <div>
            <dt>邮箱</dt>
            <dd>{{ userStore.email || "-" }}</dd>
          </div>
          <div>
            <dt>注册时间</dt>
            <dd>{{ userStore.created_at || "-" }}</dd>
          </div>
        </dl>
      </div>
    </AdminModal>
  </div>
</template>

<style scoped lang="less">
.user-panel {
  position: relative;
}

.user-panel__trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color4);
    background: var(--primary-color1);
    color: var(--primary-color);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
}

.user-panel__avatar,
.user-panel__avatar-placeholder {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  font-size: 1.6rem;
  flex-shrink: 0;
}

.user-panel__avatar {
  object-fit: cover;
}

.user-panel__avatar-placeholder {
  color: var(--text-color3, var(--text-color));
}

.user-panel__name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.user-panel__arrow {
  flex-shrink: 0;
  transition: transform 0.2s;
  font-size: 1rem;
}

.user-panel__arrow--open {
  transform: rotate(180deg);
}

.user-panel__dropdown {
  position: absolute;
  z-index: 100;
  bottom: calc(100% + 0.5rem);
  left: 0;
  right: 0;
}

.user-panel__menu {
  overflow: hidden;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 12px;
  background: var(--bg-color);
  box-shadow: 0 8px 24px rgb(0 0 0 / 12%);
}

.user-panel__menu-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.9rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: var(--primary-color1);
    color: var(--primary-color);
  }
}

.user-panel__menu-item--danger {
  color: #ef4444;
}

.user-panel__divider {
  height: 1px;
  margin: 0 0.5rem;
  background: var(--border-color7, var(--border-color));
}

.user-panel__profile {
  text-align: center;
}

.user-panel__profile-avatar {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 999px;
  font-size: 4rem;
  color: var(--text-color3, var(--text-color));

  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
  }
}

.user-panel__profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  text-align: left;

  div {
    display: flex;
    gap: 0.5rem;
  }

  dt {
    flex: 0 0 auto;
    color: var(--text-color2, var(--text-color));
    font-size: 0.85rem;
    width: 4em;
  }

  dd {
    margin: 0;
    flex: 1;
    min-width: 0;
  }
}

.user-dropdown-enter-active,
.user-dropdown-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.user-dropdown-enter-from,
.user-dropdown-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
