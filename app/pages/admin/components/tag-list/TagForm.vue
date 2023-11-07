<script setup lang="ts">
interface TagFormValue {
  name: string;
}

const props = withDefaults(defineProps<{
  modelValue: TagFormValue;
  submitting?: boolean;
}>(), {
  submitting: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: TagFormValue];
  submit: [];
  cancel: [];
}>();

const name = computed({
  get: () => props.modelValue.name,
  set: value => emit("update:modelValue", { ...props.modelValue, name: value }),
});

const canSubmit = computed(() => name.value.trim().length > 0 && !props.submitting);
</script>

<template>
  <form class="tag-form" @submit.prevent="emit('submit')">
    <label class="tag-form__field">
      <span>名称</span>
      <input v-model="name" type="text" maxlength="50" placeholder="请输入标签名称" />
    </label>

    <div class="tag-form__actions">
      <button class="tag-form__cancel" type="button" :disabled="submitting" @click="emit('cancel')">取消</button>
      <button class="tag-form__submit" type="submit" :disabled="!canSubmit">
        {{ submitting ? "保存中..." : "保存" }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="less">
.tag-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  text-align: left;
}

.tag-form__field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.45rem;

  > span {
    color: var(--text-color1, var(--text-color));
    font-size: 0.9rem;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 2.6rem;
    padding: 0 0.85rem;
    border: 1px solid var(--border-color7, var(--border-color));
    border-radius: 10px;
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

.tag-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.tag-form__cancel,
.tag-form__submit {
  padding: 0.65rem 1rem;
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
}

.tag-form__submit {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}
</style>
