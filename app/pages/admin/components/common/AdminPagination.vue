<script setup lang="ts">
const props = withDefaults(defineProps<{
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  loading?: boolean;
}>(), {
  loading: false,
});

const emit = defineEmits<{
  previous: [];
  next: [];
}>();

const rangeText = computed(() => {
  if (!props.total) return "共 0 篇";
  const start = (props.page - 1) * props.pageSize + 1;
  const end = Math.min(props.page * props.pageSize, props.total);
  return `${start}-${end} / 共 ${props.total} 篇`;
});
</script>

<template>
  <footer class="admin-pagination">
    <span>{{ rangeText }}</span>
    <div class="admin-pagination__pager">
      <button type="button" :disabled="page <= 1 || loading" @click="emit('previous')">上一页</button>
      <span>{{ page }} / {{ pageCount }}</span>
      <button type="button" :disabled="page >= pageCount || loading" @click="emit('next')">下一页</button>
    </div>
  </footer>
</template>

<style scoped lang="less">
.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-color2, var(--text-color));
  font-size: 0.9rem;
}

.admin-pagination__pager {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.admin-pagination__pager button {
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

@media (max-width: 720px) {
  .admin-pagination {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
