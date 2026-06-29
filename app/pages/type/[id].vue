<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();

const { data: type } = useQuery({
  query: async () => await $fetch(`/api/type/${route.params.id}` as "/api/type/:id"),
  key: () => [`/api/type/${route.params.id}`],
  enabled: () => !!route.params.id,
});

const {
  data,
  loadNextPage,
  hasNextPage,
  isLoading,
} = $(useInfiniteQuery({
  key: () => ["/api/article/page", String(route.params.id)],
  query: async () =>
    await $fetch("/api/article/page", {
      query: { page: 1, pageSize: 10, typeId: route.params.id },
    }),
  getNextPageParam: (lastPage, allPages) =>
    allPages.flatMap((item) => item.list).length >= lastPage.total
      ? null
      : lastPage.page + 1,
  initialPageParam: 1,
}));
const dataList = computed(() => data?.pages?.flatMap((item) => item.list) ?? []);
const totalArticles = computed(() => data?.pages?.[0]?.total ?? 0);
const isEmpty = computed(
  () => !isLoading && !!data?.pages && dataList.value.length === 0,
);
const singleArticleId = computed(() => dataList.value[0]?.id);
const currentTypeId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : id;
});
const { data: article, refetch: refetchArticle } = useQuery({
  query: async () =>
    await $fetch(`/api/article/${singleArticleId.value}` as "/api/article/:id"),
  key: () => [`/api/article/${singleArticleId.value}`],
  enabled: () => !!singleArticleId.value,
});

let quote = $ref(randomQuote())
const handleFinish = () => {
  setTimeout(() => quote = randomQuote(), 2000)
}
</script>

<template>
  <nuxt-layout name="default" :banner-title="type?.name" banner-height="38.2dvh">
    <template #banner>
      <client-only>
        <ui-typewriter m="1em" :content="quote" @finish="handleFinish" />
      </client-only>
    </template>

    <template v-if="dataList?.length !== 1">
      <article-empty v-if="isEmpty" />

      <article-article-card v-for="(item, index) in dataList" :key="item.id" :data="item"
        :type="index % 2 == 0 ? 'left' : 'right'" />

      <ui-rgb-button v-if="hasNextPage" rounded="!4px" mx="auto" whitespace="nowrap" w="max" @click="loadNextPage">
        {{ isLoading ? "加载中" : "加载更多" }}
      </ui-rgb-button>
    </template>
    <template v-else-if="singleArticleId">
      <markdown-preview class="card" :content="article?.content" />
      <article-previous-and-next :article-id="singleArticleId" />
      <article-commons :article-id="singleArticleId" :comment-count="article?.stats?.commentCount"
        @submit="refetchArticle()" />
    </template>

    <template #aside>
      <template v-if="dataList?.length !== 1">
        <article-type-card :type-id="currentTypeId" />
        <article-hot-card :type-id="currentTypeId" />
        <article-tag-card :type-id="currentTypeId" />
      </template>
      <article-catalog-card v-else-if="article?.content" article-id="markdown-preview"></article-catalog-card>

    </template>
  </nuxt-layout>
</template>

<style scoped lang="less">
.type-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.type-banner__icon {
  font-size: 3.5rem;
  line-height: 1;
}

.type-banner__desc {
  margin: 0;
  font-size: 1rem;
  opacity: 0.85;
}

.type-banner__count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
</style>
