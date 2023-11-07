<script setup lang="ts">
withDefaults(defineProps<{
  open: boolean;
  title: string;
  width?: string;
}>(), {
  width: "720px",
});

const emit = defineEmits<{
  close: [];
}>();

function close() {
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <Transition name="admin-modal">
      <div v-if="open" class="admin-modal" role="presentation" @click.self="close">
        <section
          class="admin-modal__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          :style="{ maxWidth: width }"
        >
          <header class="admin-modal__header">
            <h2>{{ title }}</h2>
            <button class="admin-modal__close" type="button" aria-label="关闭弹窗" @click="close">×</button>
          </header>
          <div class="admin-modal__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="admin-modal__footer">
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="less">
.admin-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(0 0 0 / 45%);
}

.admin-modal__panel {
  width: 100%;
  max-height: min(88vh, 860px);
  overflow: hidden;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 18px;
  background: var(--bg-color);
  box-shadow: 0 20px 60px rgb(0 0 0 / 24%);
}

.admin-modal__header,
.admin-modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color7, var(--border-color));
}

.admin-modal__header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.admin-modal__close {
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: var(--primary-color1);
    color: var(--primary-color);
  }
}

.admin-modal__body {
  max-height: calc(min(88vh, 860px) - 8rem);
  overflow: auto;
  padding: 1.25rem;
}

.admin-modal__footer {
  justify-content: flex-end;
  border-top: 1px solid var(--border-color7, var(--border-color));
  border-bottom: 0;
}

.admin-modal-enter-active,
.admin-modal-leave-active {
  transition: opacity 0.18s ease;
}

.admin-modal-enter-from,
.admin-modal-leave-to {
  opacity: 0;
}
</style>
