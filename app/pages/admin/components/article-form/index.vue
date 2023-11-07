<script setup lang="ts">
interface ArticleType {
  id: number;
  name: string;
}

interface ArticleTag {
  id: number;
  name: string;
}

interface CreatedArticle {
  id: number;
  title: string;
}

const props = withDefaults(defineProps<{
  redirectAfterCreated?: boolean;
  submitText?: string;
  submittingText?: string;
}>(), {
  redirectAfterCreated: true,
  submitText: "发布文章",
  submittingText: "发布中...",
});

const emit = defineEmits<{
  created: [article: CreatedArticle];
}>();

const message = useMessage();
const router = useRouter();

const { data: types } = useFetch<ArticleType[]>("/api/type", {
  default: () => [],
  server: false,
});
const { data: tags } = useFetch<ArticleTag[]>("/api/tag", {
  default: () => [],
  server: false,
});

let title = $ref("");
let content = $ref("");
let typeId = $ref("");
let selectedTagIds = $ref<number[]>([]);
let submitting = $ref(false);

const canSubmit = $computed(() => title.trim() && content.trim() && Number(typeId) > 0 && !submitting);

function resetForm() {
  title = "";
  content = "";
  typeId = "";
  selectedTagIds = [];
}

async function submitArticle() {
  if (!canSubmit) {
    message.warning("请填写标题、分类和正文");
    return;
  }

  submitting = true;
  try {
    const article = await $fetch<CreatedArticle>("/api/article", {
      method: "POST",
      body: {
        title,
        content,
        typeId: Number(typeId),
        tagIds: selectedTagIds,
      },
    });

    message.success("文章发布成功");
    resetForm();
    emit("created", article);

    if (props.redirectAfterCreated) {
      await router.push(`/article/${article.id}`);
    }
  } finally {
    submitting = false;
  }
}
</script>

<template>
  <form class="article-form" @submit.prevent="submitArticle">
    <div class="article-form__grid">
      <label class="article-form__field article-form__field--full">
        <span>标题</span>
        <input v-model="title" type="text" maxlength="100" placeholder="请输入文章标题" />
      </label>

      <div class="article-form__field article-form__field--full">
        <span>分类</span>
        <div class="article-form__types">
          <label v-for="item in types" :key="item.id" class="article-form__type">
            <input v-model="typeId" type="radio" :value="String(item.id)" />
            <span>{{ item.name }}</span>
          </label>
          <span v-if="!types.length" class="article-form__empty">暂无分类</span>
        </div>
      </div>

      <div class="article-form__field article-form__field--full">
        <span>标签</span>
        <div class="article-form__tags">
          <label v-for="item in tags" :key="item.id" class="article-form__tag">
            <input v-model="selectedTagIds" type="checkbox" :value="item.id" />
            <span>{{ item.name }}</span>
          </label>
          <span v-if="!tags.length" class="article-form__empty">暂无标签</span>
        </div>
      </div>

      <label class="article-form__field article-form__field--full">
        <span>正文</span>
        <textarea v-model="content" rows="14" placeholder="支持 Markdown，先从这里开始写吧。" />
      </label>
    </div>

    <div class="article-form__actions">
      <button class="article-form__reset" type="button" :disabled="submitting" @click="resetForm">清空</button>
      <button class="article-form__submit" type="submit" :disabled="!canSubmit">
        {{ submitting ? props.submittingText : props.submitText }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="less">
.article-form {
  width: 100%;
  text-align: left;
}

.article-form__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.article-form__field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.45rem;

  > span {
    color: var(--text-color1, var(--text-color));
    font-size: 0.9rem;
  }

  input:not([type="radio"]):not([type="checkbox"]),
  select,
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

  input:not([type="radio"]):not([type="checkbox"]),
  select {
    height: 2.6rem;
    padding: 0 0.85rem;
  }

  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    margin: 0;
    accent-color: var(--primary-color);
    cursor: pointer;
  }

  textarea {
    min-height: 260px;
    padding: 0.85rem;
    line-height: 1.8;
    resize: vertical;
  }
}

.article-form__field--full {
  grid-column: 1 / -1;
}

.article-form__types {
  display: flex;
  min-height: 2.6rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.article-form__type {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 999px;
  cursor: pointer;

  &:has(input:checked) {
    border-color: var(--primary-color);
    background: var(--primary-color1);
    color: var(--primary-color);
  }
}

.article-form__tags {
  display: flex;
  min-height: 2.6rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.article-form__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--border-color7, var(--border-color));
  border-radius: 999px;
  cursor: pointer;

  &:has(input:checked) {
    border-color: var(--primary-color);
    background: var(--primary-color1);
    color: var(--primary-color);
  }
}

.article-form__empty {
  color: var(--text-color3, var(--text-color));
  font-size: 0.9rem;
}

.article-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.article-form__reset,
.article-form__submit {
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

.article-form__submit {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}

@media (max-width: 640px) {
  .article-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
