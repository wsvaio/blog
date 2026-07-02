<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute();
const articleId = computed(() => Number(route.params.id));

const { data, execute } = useFetch(`/api/article/${route.params.id}` as '/api/article/:id')
const { execute: executeView } = useFetch(`/api/article/${route.params.id}/stats/view`, { method: 'post', immediate: false })
onMounted(() => {
  executeView()
})
</script>

<template>
  <nuxt-layout name="default" :banner-title="data?.title" banner-height="38.2dvh">
    <template #banner>
      <ul m="0 t-1.5em" p="0" list="none" flex="~" gap=".5em">
        <li flex="~">
          <div class="i-material-symbols-calendar-month" />
          <span>发表于 {{ dateFormat(data?.created_at!) }}</span>
        </li>
        <template v-if="data?.updated_at">
          <li>|</li>
          <li flex="~">
            <div class="i-ic-twotone-update" />
            <span>更新于 {{ dateFormat(data?.updated_at) }}</span>
          </li>
        </template>
        <li>|</li>
        <li flex="~">
          <div class="i-carbon-category" />
          <span>{{ data?.type?.name || '' }}</span>
        </li>
      </ul>
      <ul m="0 t-1em" p="0" list="none" flex="~" gap=".5em">
        <li flex="~">
          <div class="i-mdi-file-word-outline" />
          <span>字数总计: {{ data?.content?.length || 0 }}</span>
        </li>
        <li>|</li>
        <li flex="~">
          <div class="i-carbon-view" />
          <span>阅读量: {{ data?.stats?.viewCount }}</span>
        </li>
        <li>|</li>
        <li flex="~">
          <div class="i-majesticons-comment-2-text-line" />
          <span>评论数: {{ data?.stats?.commentCount }}</span>
        </li>
      </ul>
    </template>

    <markdown-preview class="card" :content="data?.content" />
    <article-previous-and-next :article-id="articleId" />
    <article-commons :article-id="articleId" :comment-count="data?.stats?.commentCount" @submit="execute()" />

    <template #aside>
      <article-catalog-card v-if="data?.content" article-id="markdown-preview" />
    </template>
  </nuxt-layout>
</template>
