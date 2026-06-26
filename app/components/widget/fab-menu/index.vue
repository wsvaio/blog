<script setup lang="ts">
const { y } = useWindowScroll({ behavior: "smooth" });
const { isDark, toggleTheme } = useTheme();
const { toggleWallpaper } = useWallpaper();
const main = useMainStore();

const isOpen = ref(false);
const copied = ref(false);

// 阅读进度
const docEl = computed(() => import.meta.client ? document.documentElement : null);
const scrollProgress = computed(() => {
  const el = docEl.value;
  if (!el) return 0;
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return 0;
  return Math.min(y.value / max, 1);
});

// 全屏状态追踪
onMounted(() => {
  const updateFs = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };
  document.addEventListener("fullscreenchange", updateFs);
  onBeforeUnmount(() => document.removeEventListener("fullscreenchange", updateFs));
});

const scrollToTop = () => {
  y.value = 0;
  isOpen.value = false;
};

const scrollToBottom = () => {
  y.value = document.documentElement.scrollHeight;
  isOpen.value = false;
};

const { toggle: toggleFullscreen, isFullscreen } = useFullscreen()


const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
  // 同步 useMessage
  useMessage()?.success?.("链接已复制到剪贴板");
};

// 菜单项定义
const menuItems = computed(() => [
  {
    label: isDark.value ? "浅色模式" : "暗黑模式",
    icon: isDark.value ? "i-carbon:sun" : "i-carbon:moon",
    action: () => { toggleTheme(); },
  },
  {
    label: main.wallpaperType === "anime" ? "切换风景" : "切换二次元",
    icon: main.wallpaperType === "anime" ? "i-carbon:user-avatar-filled-alt" : "i-carbon:image",
    action: toggleWallpaper,
  },
  {
    label: main.autoRotate ? "暂停轮播" : "开始轮播",
    icon: main.autoRotate ? "i-carbon:pause-filled" : "i-carbon:play-filled-alt",
    action: () => main.autoRotate = !main.autoRotate,
  },
  {
    label: main.pioVisible ? "隐藏看板娘" : "显示看板娘",
    icon: main.pioVisible ? "i-carbon:face-wink" : "i-carbon:face-dizzy",
    action: () => main.pioVisible = !main.pioVisible,
  },
  {
    label: isFullscreen.value ? "退出全屏" : "进入全屏",
    icon: isFullscreen.value ? "i-material-symbols:fullscreen-exit" : "i-material-symbols:fullscreen",
    action: toggleFullscreen,
  },
  {
    label: "跳转底部",
    icon: "i-carbon:arrow-down",
    action: scrollToBottom,
  },
  {
    label: copied.value ? "已复制!" : "复制链接",
    icon: copied.value ? "i-carbon:checkmark" : "i-carbon:share",
    action: copyLink,
  },
]);

// 点击外部关闭
const menuRef = $ref<HTMLElement>();
onClickOutside(() => menuRef, () => (isOpen.value = false));
</script>

<template>
  <div ref="menuRef" class="fab-menu" :class="{ 'is-open': isOpen }">
    <!-- 展开的菜单项 -->
    <TransitionGroup name="fab-item" tag="div" class="fab-menu__items">
      <button v-for="(item, i) in (isOpen ? menuItems : [])" :key="i" class="fab-menu__item"
        :style="{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }" :title="item.label" @click="item.action">
        <span :class="item.icon" />
        <span class="fab-menu__label">{{ item.label }}</span>
      </button>
    </TransitionGroup>

    <!-- 主按钮：进度环 + 回到顶部 + 展开触点 -->
    <div class="fab-menu__main">
      <!-- 展开按钮 -->
      <button class="fab-menu__trigger" :class="{ 'is-open': isOpen }" title="更多操作" @click="isOpen = !isOpen">
        <span class="i-carbon:overflow-menu-horizontal" />
      </button>

      <!-- 主按钮 + 进度环 -->
      <button class="fab-menu__primary" title="回到顶部" @click="scrollToTop">
        <svg class="fab-menu__progress-ring" viewBox="0 0 48 48">
          <circle class="fab-menu__progress-bg" cx="24" cy="24" r="22" />
          <circle class="fab-menu__progress-fg" cx="24" cy="24" r="22" :stroke-dasharray="138.23"
            :stroke-dashoffset="138.23 * (1 - scrollProgress)" />
        </svg>
        <span class="fab-menu__primary-icon" :class="isOpen ? 'i-carbon:close' : 'i-carbon:chevron-up'" />
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.fab-menu {
  position: fixed;
  right: 1.5em;
  bottom: 1.5em;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
}

// 菜单项容器
.fab-menu__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
}

.fab-menu__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  backdrop-filter: saturate(200%) blur(12px);
  color: var(--text-color);
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.12);
    box-shadow: 0 4px 14px rgb(0 0 0 / 18%);
    color: var(--primary-color);
  }
}

.fab-menu__label {
  position: absolute;
  right: calc(100% + 8px);
  white-space: nowrap;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: var(--text-color);
  color: var(--bg-color);
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.fab-menu__item:hover .fab-menu__label {
  opacity: 1;
}

// 主按钮区
.fab-menu__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
}

.fab-menu__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: var(--bg-color);
  box-shadow: 0 2px 6px rgb(0 0 0 / 10%);
  backdrop-filter: saturate(200%) blur(12px);
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }

  &.is-open {
    transform: rotate(90deg);
  }
}

.fab-menu__primary {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: var(--bg-color);
  box-shadow: 0 2px 10px rgb(0 0 0 / 14%);
  backdrop-filter: saturate(200%) blur(12px);
  color: var(--text-color);
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 16px rgb(0 0 0 / 20%);
    color: var(--primary-color);
  }

  &:active {
    transform: scale(0.95);
  }
}

.fab-menu__progress-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.fab-menu__progress-bg {
  fill: none;
  stroke: var(--border-color);
  stroke-width: 2;
  opacity: 0.3;
}

.fab-menu__progress-fg {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s ease;
}

.fab-menu__primary-icon {
  position: relative;
  z-index: 1;
}

// TransitionGroup 动画
.fab-item-enter-active,
.fab-item-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-item-enter-from,
.fab-item-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.6);
}

.fab-item-move {
  transition: transform 0.3s ease;
}
</style>
