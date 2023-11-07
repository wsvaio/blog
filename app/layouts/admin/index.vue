<script setup lang="ts">
import UserPanel from "../../pages/admin/components/common/UserPanel.vue";
const user = useUserStore()
const navItems = [
  {
    label: "文章管理",
    to: "/admin/articles",
    icon: "i-carbon:list-boxes",
  },
  {
    label: "分类管理",
    to: "/admin/types",
    icon: "i-carbon:tag",
  },
  {
    label: "标签管理",
    to: "/admin/tags",
    icon: "i-carbon:tag-group",
  },
  {
    label: "回到首页",
    to: "/",
    icon: "i-carbon:home",
  },
];
</script>

<template>
  <div class="admin-layout" font="!sans">
    <aside class="admin-layout__aside">
      <div class="admin-layout__aside-top">
        <NuxtLink class="admin-layout__brand" to="/admin">
          <span class="i-carbon:dashboard" />
          <span>管理面板</span>
        </NuxtLink>

        <nav class="admin-layout__nav" aria-label="管理后台导航">
          <NuxtLink v-for="item in navItems" :key="item.to" class="admin-layout__nav-item" :to="item.to">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="admin-layout__aside-bottom">
        {{ user.$state }}
        <UserPanel />
      </div>
    </aside>

    <main class="admin-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="less">
.admin-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 100dvh;
  background: var(--bg-color);
  color: var(--text-color);
  position: relative;
}

.admin-layout__aside {
  position: sticky;
  top: 0;
  height: 100dvh;
  box-sizing: border-box;
  padding: 1.25rem;
  border-right: 1px solid var(--border-color7, var(--border-color));
  display: flex;
  flex-direction: column;
}

.admin-layout__aside-top {
  flex: 1;
  min-height: 0;
}

.admin-layout__aside-bottom {
  flex: 0 0 auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color7, var(--border-color));
}

.admin-layout__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  color: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
}

.admin-layout__nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-layout__nav-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid transparent;
  border-radius: 12px;
  color: inherit;
  text-decoration: none;

  &:hover,
  &.router-link-active {
    border-color: var(--primary-color4);
    background: var(--primary-color1);
    color: var(--primary-color);
  }
}

.admin-layout__main {
  box-sizing: border-box;
  min-width: 0;
  padding: 2rem;
}

@media (max-width: 760px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-layout__aside {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border-color7, var(--border-color));
  }

  .admin-layout__nav {
    flex-direction: row;
    overflow-x: auto;
  }

  .admin-layout__nav-item {
    flex: 0 0 auto;
  }

  .admin-layout__main {
    padding: 1rem;
  }
}
</style>
