<script setup lang="ts">
import AdminBadge from "../common/AdminBadge.vue";

interface ArticleType {
  id: number;
  name: string;
}

interface ArticleTag {
  id: number;
  name: string;
}

interface ArticleEditorValue {
  title: string;
  content: string;
  typeId: number | null;
  tagIds: number[];
}

const props = withDefaults(defineProps<{
  modelValue: ArticleEditorValue;
  types: ArticleType[];
  tags: ArticleTag[];
  submitting?: boolean;
}>(), {
  submitting: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: ArticleEditorValue];
  submit: [];
  cancel: [];
}>();

const title = computed({
  get: () => props.modelValue.title,
  set: value => emit("update:modelValue", { ...props.modelValue, title: value }),
});

const content = computed({
  get: () => props.modelValue.content,
  set: value => emit("update:modelValue", { ...props.modelValue, content: value }),
});

const typeId = computed({
  get: () => props.modelValue.typeId ? String(props.modelValue.typeId) : "",
  set: value => emit("update:modelValue", { ...props.modelValue, typeId: Number(value) || null }),
});

const tagIds = computed({
  get: () => props.modelValue.tagIds,
  set: value => emit("update:modelValue", { ...props.modelValue, tagIds: value }),
});

const canSubmit = computed(() => title.value.trim() && content.value.trim() && Number(typeId.value) > 0 && !props.submitting);
</script>

<template>
  <form class="article-edit-form" @submit.prevent="emit('submit')">
    <label class="article-edit-form__field article-edit-form__field--full">
      <span>标题</span>
      <input v-model="title" type="text" maxlength="100" placeholder="请输入文章标题" />
    </label>

    <div class="article-edit-form__field article-edit-form__field--full">
      <span>分类</span>
      <div class="article-edit-form__options">
        <label v-for="item in types" :key="item.id" class="article-edit-form__option">
          <input v-model="typeId" type="radio" :value="String(item.id)" />
          <AdminBadge>{{ item.name }}</AdminBadge>
        </label>
        <span v-if="!types.length" class="article-edit-form__empty">暂无分类</span>
      </div>
    </div>

    <div class="article-edit-form__field article-edit-form__field--full">
      <span>标签</span>
      <div class="article-edit-form__options">
        <label v-for="item in tags" :key="item.id" class="article-edit-form__option">
          <input v-model="tagIds" type="checkbox" :value="item.id" />
          <AdminBadge>{{ item.name }}</AdminBadge>
        </label>
        <span v-if="!tags.length" class="article-edit-form__empty">暂无标签</span>
      </div>
    </div>

    <label class="article-edit-form__field article-edit-form__field--full">
      <span>正文</span>
      <textarea v-model="content" rows="14" placeholder="支持 Markdown" />
    </label>

    <div class="article-edit-form__actions">
      <button class="article-edit-form__cancel" type="button" :disabled="submitting" @click="emit('cancel')">取消</button>
      <button class="article-edit-form__submit" type="submit" :disabled="!canSubmit">
        {{ submitting ? "保存中..." : "保存修改" }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="less">
.article-edit-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  text-align: left;
}

.article-edit-form__field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.45rem;

  > span {
    color: var(--text-color1, var(--text-color));
    font-size: 0.9rem;
  }

  input:not([type="radio"]):not([type="checkbox"]),
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

  input:not([type="radio"]):not([type="checkbox"]) {
    height: 2.6rem;
    padding: 0 0.85rem;
  }

  textarea {
    min-height: 260px;
    padding: 0.85rem;
    line-height: 1.8;
    resize: vertical;
  }
}

.article-edit-form__field--full {
  grid-column: 1 / -1;
}

.article-edit-form__options {
  display: flex;
  min-height: 2.6rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.article-edit-form__option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;

  input {
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    margin: 0;
    accent-color: var(--primary-color);
    cursor: pointer;
  }
}

.article-edit-form__empty {
  color: var(--text-color3, var(--text-color));
  font-size: 0.9rem;
}

.article-edit-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.article-edit-form__cancel,
.article-edit-form__submit {
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

.article-edit-form__submit {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}
</style>
