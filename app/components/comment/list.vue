<!-- eslint-disable import/no-self-import -->
<script setup lang="ts">
import { createMarkdownExit } from "markdown-exit";
import Self from "./list.vue";


const md = createMarkdownExit({
  html: true,
});

const selfRef = useTemplateRef('selfRef')


const { articleId, parentId } = defineProps<{
  articleId?: number;
  parentId?: number;
}>();

const { data, refresh } = useFetch(articleId ? `/api/article/${articleId}/comment` : `/api/comment/${parentId}/comment`)

const commentId = defineModel<number>("commentId");

defineExpose({
  refresh: () => {
    refresh();
    selfRef?.value?.forEach?.((item) => item?.refresh?.())
  }
})
</script>

<template>
  <ul v-if="data?.length" flex="~ col" gap="1em">
    <li v-for="item in data" grid="~ cols-[max-content_1fr_max-content] rows-[max-content_1fr]" gap="x-.5em">
      <nuxt-link :to="item.website || undefined" grid="row-span-2">
        <img :src="item.avatar || defaultAvatarUrl" alt="头像" w="40px" h="40px" />
      </nuxt-link>
      <div flex="~" items="end">
        <nuxt-link :to="item.website || undefined" :style="{
          color: item.website ? 'var(--primary-color)' : 'inherit',
        }" class="underline-transparent">
          <span>{{ item.nickname }}</span>
        </nuxt-link>
        <small v-if="item?.email == 'wsvaio@qq.com'" text="[var(--info-color)]">站长</small>
      </div>

      <a bg="transparent" transition="all" un-text="!hover:[var(--primary-color)]" cursor="pointer" ml="auto"
        grid="row-span-2" :style="{
          color: item.id == commentId ? 'var(--error-color)' : 'var(--text-color)',
        }" @click="commentId = commentId == item.id ? 0 : item.id">
        {{ item.id == commentId ? "取消" : "回复" }}
      </a>
      <small self="end">
        <span>发布于 {{ dateFormat(item.created_at) }}</span>
        <!-- <span>（</span> -->
        <!-- <span>🥁</span> -->
        <!-- <div class="i-icon-park-browser" /> -->
        <!-- <span>{{ `${item?.from?.browserName} ${item?.from?.browserVersion}` }}</span> -->
        <!-- <span><span>🥁</span></span> -->
        <!-- <div class="i-icon-park-system" /> -->
        <!-- <span>&nbsp;{{ `${item?.from?.osName} ${item?.from?.osVersion}` }}</span> -->
        <!-- <span>&nbsp;{{ `来自：${item?.from?.province} ${item?.from?.city} ${item?.from?.isp}` }}</span> -->
        <!-- <span>{{ item?.userAgent }}</span> -->
        <!-- <span>）</span> -->
      </small>

      <div grid="col-span-full" v-html="md.render(item.content)" />

      <div :id="`comment${item.id}`" grid="col-span-full" />
      <hr grid="col-span-full" w="full" m="0" border="none" h="1px" bg="[var(--border-color)]" />

      <self v-model:comment-id="commentId" grid="col-span-full" :parentId="item.id" mt="1em" ref="selfRef" />
    </li>
  </ul>
</template>
