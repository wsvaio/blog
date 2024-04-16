<script setup lang="ts">
import READMD from "/README.md?raw";

const { data: commits, execute } = await useLazyFetch<Record<any, any>[]>(
  "https://api.github.com/repos/wsvaio/blog/commits?per_page=999",
  { immediate: false }
);
onMounted(() => {
  execute();
});

const { data: message, execute: executeMessage } = await useFetch<any>("/api/common/message");
const nextMessage = () => setTimeout(() => executeMessage(), 5000);
</script>

<template>
  <nuxt-layout banner-title="关于" banner-height="38.2dvh">
    <template #banner>
      <typewriter m="1em" :content="message?.content" @finish="nextMessage" />
    </template>
    <div class="card">
      <markdown-preview bg="![transparent]" :model-value="READMD" />
      <h2>更新日志（commit历史）</h2>

      <!-- <ul m="0" p="0" lh="[1.5]">
        <li v-for="item in commits" flex="~ justify-between">
          <span>{{ item?.commit?.message }}</span>
          <span>{{ dateFormat(new Date(item?.commit?.committer?.date).toLocaleString()) }}</span>
        </li>
      </ul> -->

      <time-line
        :data="
          commits?.map(item => ({
            item,
            date: new Date(item?.commit?.committer?.date),
            content: item?.commit?.message,
          }))
        "
      >
        <template #month="d">{{ d.month + 1 }}月（{{ d.items.length }}次更新）</template>

        <template #default="{ item }">
          <nuxt-link
            :to="item?.html_url" target="_blank" text-inherit underline-transparent
            hover="text-[var(--primary-color)]"
          >
            {{ item?.commit?.message }}
          </nuxt-link>
        </template>
      </time-line>
    </div>
  </nuxt-layout>
</template>

<style lang="less" scoped></style>
