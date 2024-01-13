<script setup lang="ts">
// const route = useRoute();
// const id = route.params.id;

const { data } = await useFetch<any[]>("/api/friend");

useSeoMeta({
  title: "朋友们",
});
</script>

<template>
  <nuxt-layout banner-title="朋友们" banner-height="38.2dvh">
    <!-- <markdown-preview :model-value="data.content" /> -->

    <ul list="none" grid="~ cols-[repeat(auto-fill,minmax(250px,1fr))]" gap="1em">
      <!-- flex="~ col items-center justify-center gap-.5em" -->
      <li
        v-for="item in data"
        grid="~ cols-[max-content_1fr] rows-2"
        items="center"
        class="card"
        pos="relative"
        p="!1em"
        gap="x-.5em"
        hover="![--bgopc:50%]"
        :style="{
          '--bgopc': '25%'
        }"
      >
        <img
          v-if="item.screenshot"
          :src="item.screenshot"
          pos="absolute"
          h="full"
          w="full"
          object="cover"
          class="opacity-[var(--bgopc)]"
          transition="all duration-300"
        />

        <img :src="item.avatar" w="4em" h="4em" rounded="full" z="10" grid="row-span-2" />
        <h3 z="10" m="0">
          <nuxt-link :to="item.link" un-text="inherit" underline="transparent" z="10" target="_blank">
            {{ item.name }}
          </nuxt-link>
        </h3>
        <p m="0" z="10">{{ item.descr }}</p>
      </li>
    </ul>

    <!-- <template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template> -->
  </nuxt-layout>
</template>
