<script setup lang="ts">
definePageMeta({
  // layout: {
  //   name: 'default',
  //   props: {
  //     showAside: false,
  //     bannerTitle: '文章详情',
  //   },
  // },
  layout: false
})



const { data, loadNextPage, hasNextPage, isLoading } = $(useInfiniteQuery({
  key: ['/api/article/page'],
  query: async ({ pageParam }) => (await $fetch('/api/article/page', { query: { page: pageParam, pageSize: 10 } })),
  getNextPageParam: (lastPage, allPages) => allPages.flatMap(item => item.list).length >= lastPage.total ? null : lastPage.page + 1,
  initialPageParam: 1,
}))
const dataList = computed(() => data?.pages?.flatMap(item => item.list))


const { y } = useWindowScroll({ behavior: "smooth" });
function jump() {
  y.value = document.documentElement.clientHeight - 48;
}


let quote = $ref(randomQuote())
const handleFinish = () => {
  setTimeout(() => quote = randomQuote(), 2000)
}
</script>

<template>
  <nuxt-layout name="default" banner-title="HI THERE">
    <template #banner>
      <ui-typewriter m="1em" :content="quote" @finish="handleFinish" />
      <div class="arrow i-ion-ios-arrow-down" @click="jump" />
    </template>

    <article-article-card v-for="(item, index) in dataList" :key="item.id" :data="item"
      :type="index % 2 == 0 ? 'left' : 'right'" />

    <ui-rgb-button v-if="hasNextPage" rounded="!4px" mx="auto" whitespace="nowrap" w="max" @click="loadNextPage">
      {{ isLoading ? "加载中" : "加载更多" }}
    </ui-rgb-button>

    <!-- <div h="50vh"></div> -->

    <template #aside>
      <article-about-card />
      <article-hot-card />
      <article-tag-card />
      <!-- <tiangou-card /> -->
    </template>
  </nuxt-layout>
</template>

<style lang="less" scoped>
.arrow {
  @keyframes scroll-down-effect {
    0% {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
    }

    50% {
      transform: translateY(-16px) translateX(-50%);
      opacity: 0.4;
    }

    100% {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
    }
  }

  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-down-effect 1.5s infinite;
  color: white;
  font-size: 32px;
  cursor: pointer;
  filter: drop-shadow(0 0.1875rem 0.3125rem #1c1f21);
}
</style>
