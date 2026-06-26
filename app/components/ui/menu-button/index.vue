<script setup lang="ts">

</script>

<template>
  <!-- 移动端菜单按钮 -->
  <button class="header-menu-btn" aria-label="菜单">
    <span class="menu-icon">
      <span class="menu-bar"></span>
      <span class="menu-bar"></span>
      <span class="menu-bar"></span>
    </span>
  </button>
</template>

<style lang="less" scoped>
/* 移动端菜单按钮 */
.header-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  z-index: 10000;

  @media (min-width: 768px) {
    display: none;
  }
}

.menu-icon {
  position: relative;
  width: 20px;
  height: 14px;
}

.menu-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:nth-child(1) {
    top: 0;
  }

  &:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  &:nth-child(3) {
    bottom: 0;
  }
}

.header-menu-btn.active .menu-bar {
  &:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  &:nth-child(2) {
    opacity: 0;
    transform: translateX(10px) translateY(-50%);
  }

  &:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }
}
</style>
