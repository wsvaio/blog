<script setup lang="ts">
import Comment from "./comment.vue";
import CommentOn from "./comment-on.vue";

interface List {
  id: number;
  avatar: string;
  name: string;
  content: string;
  site: string;
  comments: List[];
}
const { articleId } = defineProps<{
  articleId: number;
  list?: List[];
}>();

defineEmits<{
  submit: [];
}>();

const commentId = $ref<number>();

const tpId = computed(() => `#comment${commentId || "on"}`);
</script>

<template>
  <div class="card comments">
    <h2>Comments | {{ list?.length }}条评论</h2>

    <div class="overflow-auto">
      <comment v-model:comment-id="commentId" :list="list" pl="0" />
    </div>

    <div id="commenton" />

    <client-only>
      <teleport :to="tpId">
        <comment-on :article-id="articleId" :comment-id="commentId" @submit="$emit('submit'), (commentId = 0)" />
      </teleport>
    </client-only>
  </div>
</template>

<style lang="less" scoped></style>
