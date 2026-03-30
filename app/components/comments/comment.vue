<!-- eslint-disable import/no-self-import -->
<script setup lang="ts">
import { dateFormat } from "@wsvaio/utils";
import { marked } from "marked";
import Self from "./comment.vue";

defineProps<{
  list?: Record<any, any>[];
}>();

const commentId = defineModel<number>("commentId");
</script>

<template>
  <ul v-if="list?.length" flex="~ col" gap="1em">
    <li v-for="item in list" grid="~ cols-[max-content_1fr_max-content] rows-[max-content_1fr]" gap="x-.5em">
      <nuxt-link :to="item.site || undefined" grid="row-span-2">
        <img :src="item.avatar" alt="头像" w="40px" h="40px" />
      </nuxt-link>
      <div flex="~" items="end">
        <nuxt-link
          :to="item.site || undefined"
          :style="{
            color: item.site ? 'var(--primary-color)' : 'inherit',
          }"
          class="underline-transparent"
        >
          <span>{{ item.name }}</span>
        </nuxt-link>
        <small v-if="item?.user?.email == 'wsvaio@qq.com'" text="[var(--info-color)]">站长</small>
      </div>

      <a
        bg="transparent"
        transition="all"
        un-text="!hover:[var(--primary-color)]"
        cursor="pointer"
        ml="auto"
        grid="row-span-2"
        :style="{
          color: item.id == commentId ? 'var(--error-color)' : 'var(--text-color)',
        }"
        @click="commentId = commentId == item.id ? 0 : item.id"
      >
        {{ item.id == commentId ? "取消" : "回复" }}
      </a>
      <small self="end">
        <span>发布于 {{ dateFormat(new Date(item.createAt)) }}</span>
        <span>（</span>
        <!-- <span>🥁</span> -->
        <!-- <div class="i-icon-park-browser" /> -->
        <span>{{ `${item?.from?.browserName} ${item?.from?.browserVersion}` }}</span>
        <!-- <span><span>🥁</span></span> -->
        <!-- <div class="i-icon-park-system" /> -->
        <span>&nbsp;{{ `${item?.from?.osName} ${item?.from?.osVersion}` }}</span>
        <span>&nbsp;{{ `来自：${item?.from?.province} ${item?.from?.city} ${item?.from?.isp}` }}</span>
        <span>）</span>
      </small>

      <div grid="col-span-full" v-html="marked(item.content)" />

      <div :id="`comment${item.id}`" grid="col-span-full" />
      <hr grid="col-span-full" w="full" m="0" border="none" h="1px" bg="[var(--border-color)]" />

      <self v-model:comment-id="commentId" grid="col-span-full" :list="item.comments" mt="1em" />
    </li>
  </ul>
</template>
