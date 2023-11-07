<script setup lang="ts">
withDefaults(defineProps<{
  tone?: "primary" | "muted" | "danger";
}>(), {
  tone: "primary",
});
</script>

<template>
  <span class="admin-badge" :class="`admin-badge--${tone}`">
    <slot />
  </span>
</template>

<style scoped lang="less">
.admin-badge {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  font-size: 0.78rem;
  line-height: 1.4;
  white-space: nowrap;
}

.admin-badge--primary {
  background: var(--primary-color1);
  color: var(--primary-color);
}

.admin-badge--muted {
  background: transparent;
  color: var(--text-color3, var(--text-color));
}

.admin-badge--danger {
  background: rgb(239 68 68 / 12%);
  color: #ef4444;
}
</style>
