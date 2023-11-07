<script setup lang="ts">
// const route = useRoute();
// const id = route.params.id;
definePageMeta({
  layout: false,
})

const { data } = await useFetch("/api/article");
useSeoMeta({
  title: "归档",
});

let quote = $ref(randomQuote())
const handleFinish = () => {
  setTimeout(() => quote = randomQuote(), 2000)
}
</script>

<template>
  <nuxt-layout name="default" banner-title="归档" banner-height="38.2dvh" :showAside="false" >
    <template #banner>
      <ui-typewriter m="1em" :content="quote" @finish="handleFinish" />
    </template>

    <div class="card">
      <ui-time-line
        :data="
          data?.map(item => ({
            item,
            date: new Date(item?.created_at),
            content: item?.title,
          }))
        "
      >
        <template #month="d">{{ d.month + 1 }}月（{{ d.items?.length }}篇文章）</template>
        <template #default="{ item }">
          <nuxt-link
            :to="`/article/${item?.id}`"
            text-inherit
            underline-transparent
            hover="text-[var(--primary-color)]"
          >
            <span>{{ item?.title }}</span>
            <span>
              （{{ item?.stats?.viewCount }}
              <button class="i-solar-fire-bold" font-size="inherit" />
              / {{ item?.stats?.commentCount }}
              <button class="i-mdi-comment-processing" font-size="inherit" />
              ）
            </span>
          </nuxt-link>
        </template>
      </ui-time-line>
    </div>

    <!-- <template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template> -->
  </nuxt-layout>
</template>
