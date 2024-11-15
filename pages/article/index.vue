<script setup lang="ts">
// const route = useRoute();
// const id = route.params.id;

const { data } = await useFetch<Record<any, any>[]>("/api/article");
useSeoMeta({
  title: "归档",
});

const { data: message, execute: executeMessage } = await useFetch<any>("/api/common/message");
const nextMessage = () => setTimeout(() => executeMessage(), 5000);
</script>

<template>
  <nuxt-layout banner-title="归档" banner-height="38.2dvh">
    <template #banner>
      <typewriter m="1em" :content="message?.content" @finish="nextMessage" />
    </template>

    <div class="card">
      <time-line
        :data="
          data?.map(item => ({
            item,
            date: new Date(item?.createAt),
            content: item?.title,
          }))
        "
      >
        <template #month="d">
          {{ d.month + 1 }}月（{{ d.items?.length }}篇文章）
        </template>
        <template #default="{ item }">
          <nuxt-link :to="`/article/${item?.id}`" text-inherit underline-transparent hover="text-[var(--primary-color)]">
            <span>{{ item?.title }}</span>
            <span>
              （{{ item?.reads }}
              <button class="i-solar-fire-bold" font-size="inherit" />
              / {{ item?._count.comments }}
              <button class="i-mdi-comment-processing" font-size="inherit" />
              ）
            </span>
          </nuxt-link>
        </template>
      </time-line>
    </div>

    <!-- <template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template> -->
  </nuxt-layout>
</template>
