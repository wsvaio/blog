<script setup lang="ts">
const { articleId } = defineProps<{
  articleId: number;
  commentCount?: number;
}>();


const commentRef = useTemplateRef('commentRef')

defineEmits<{
  submit: [];
}>();

const commentId = $ref<number>();

const tpId = computed(() => `#comment${commentId || "on"}`);
</script>

<template>
  <div class="card comments">
    <h2>Comments | {{ commentCount || 0 }}条评论</h2>

    <div class="overflow-auto">
      <comment-list ref="commentRef" v-model:comment-id="commentId" :article-id="articleId" pl="0" />
    </div>

    <div id="commenton" />

    <client-only>
      <teleport :to="tpId">
        <comment-on :article-id="articleId" :comment-id="commentId"
          @submit="$emit('submit'), commentRef?.refresh?.(), (commentId = 0)" />
      </teleport>
    </client-only>
  </div>
</template>

<style lang="less" scoped></style>
