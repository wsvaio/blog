<script setup lang="ts">
withDefaults(defineProps<{
  empty?: boolean;
  error?: unknown;
  loading?: boolean;
  emptyText?: string;
  loadingText?: string;
  columnCount?: number;
  minWidth?: string;
}>(), {
  empty: false,
  loading: false,
  emptyText: "暂无数据",
  loadingText: "加载中...",
  columnCount: 1,
  minWidth: "780px",
});
</script>

<template>
  <div class="admin-data-table">
    <p v-if="error" class="admin-data-table__error">
      <slot name="error">数据加载失败，请稍后重试。</slot>
    </p>

    <div class="admin-data-table__wrap">
      <table class="admin-data-table__table" :style="{ minWidth }">
        <thead>
          <slot name="head" />
        </thead>
        <tbody>
          <tr v-if="loading && empty">
            <td :colspan="columnCount" class="admin-data-table__state">{{ loadingText }}</td>
          </tr>
          <tr v-else-if="empty">
            <td :colspan="columnCount" class="admin-data-table__state">{{ emptyText }}</td>
          </tr>
          <slot v-else />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="less">
.admin-data-table {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-data-table__error {
  margin: 0;
  color: #ef4444;
}

.admin-data-table__wrap {
  overflow-x: auto;
}

.admin-data-table__table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  :deep(th),
  :deep(td) {
    padding: 0.85rem;
    border-bottom: 1px solid var(--border-color7, var(--border-color));
    vertical-align: top;
  }

  :deep(th) {
    color: var(--text-color2, var(--text-color));
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.admin-data-table__state {
  color: var(--text-color3, var(--text-color));
  text-align: center;
}
</style>
