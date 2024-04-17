<script setup lang='ts'>
// const route = useRoute();
// const id = route.params.id;

const { data } = await useFetch<any>("/api/type");

useSeoMeta({
  title: "分类",
});
</script>

<template>
  <nuxt-layout banner-title="分类" banner-height="38.2dvh">
    <!-- <markdown-preview :model-value="data.content" /> -->

    <div bg="[var(--bg-color)]">
      <ul>
        <li v-for="item in data">{{ item.name }}</li>
      </ul>
    </div>

    <!-- <template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template> -->
  </nuxt-layout>
</template>
