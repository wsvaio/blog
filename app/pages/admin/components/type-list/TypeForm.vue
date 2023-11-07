<script setup lang="ts">
interface TypeFormValue {
  name: string;
  icon: string;
  description: string;
  order: number;
}

const props = withDefaults(defineProps<{
  modelValue: TypeFormValue;
  submitting?: boolean;
}>(), {
  submitting: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: TypeFormValue];
  submit: [];
  cancel: [];
}>();

const name = computed({
  get: () => props.modelValue.name,
  set: value => emit("update:modelValue", { ...props.modelValue, name: value }),
});
const icon = computed({
  get: () => props.modelValue.icon,
  set: value => emit("update:modelValue", { ...props.modelValue, icon: value }),
});
const description = computed({
  get: () => props.modelValue.description,
  set: value => emit("update:modelValue", { ...props.modelValue, description: value }),
});
const order = computed({
  get: () => props.modelValue.order,
  set: value => emit("update:modelValue", { ...props.modelValue, order: value }),
});

const canSubmit = computed(() => name.value.trim().length > 0 && !props.submitting);
</script>

<template>
  <form class="type-form" @submit.prevent="emit('submit')">
    <label class="type-form__field">
      <span>名称</span>
      <input v-model="name" type="text" maxlength="50" placeholder="请输入分类名称" />
    </label>

    <label class="type-form__field">
      <span>图标</span>
      <input v-model="icon" type="text" maxlength="50" placeholder="图标类名，如 i-carbon:code（可选）" />
    </label>

    <label class="type-form__field">
      <span>描述</span>
      <textarea v-model="description" rows="3" maxlength="200" placeholder="分类描述（可选）" />
    </label>

    <label class="type-form__field">
      <span>排序</span>
      <input v-model.number="order" type="number" min="0" step="1" placeholder="数字越小越靠前" />
    </label>

    <div class="type-form__actions">
      <button class="type-form__cancel" type="button" :disabled="submitting" @click="emit('cancel')">取消</button>
      <button class="type-form__submit" type="submit" :disabled="!canSubmit">
        {{ submitting ? "保存中..." : "保存" }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="less">
.type-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  text-align: left;
}

.type-form__field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.45rem;

  > span {
    color: var(--text-color1, var(--text-color));
    font-size: 0.9rem;
  }

  input,
  textarea {
    box-sizing: border-box;
    width: 100%;
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

  input {
    height: 2.6rem;
    padding: 0 0.85rem;
  }

  textarea {
    padding: 0.85rem;
    line-height: 1.8;
    resize: vertical;
  }
}

.type-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.type-form__cancel,
.type-form__submit {
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

.type-form__submit {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}
</style>
