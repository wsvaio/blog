<script setup lang="ts">
// const route = useRoute();
// const id = route.params.id;

const { data } = await useFetch<any[]>("/api/article");

const r = computed(() => {
  if (!data?.value?.length)
    return [];
  const years = new Set<number>();
  const list = data.value.map(item => {
    const date = new Date(item.createAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    years.add(date.getFullYear());
    return {
      ...item,
      date,
      year,
      month,
    };
  });
  return [...years].map(year => ({
    year,
    months: [...new Set(list.filter(item => item.year === year).map(item => item.month))].map(month => {
      return {
        month,
        articles: list.filter(sub => sub.year === year && sub.month === month),
      };
    }),
  }));
});

useSeoMeta({
  title: "归档",
});
</script>

<template>
  <nuxt-layout banner-title="归档" banner-height="38.2dvh">
    <!-- <markdown-preview :model-value="data.content" /> -->

    <div class="card">
      <ul v-for="item in r" list="none">
        <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
          <div />
          <h2>{{ item.year }}</h2>
          <div />
        </li>
        <template v-for="sub in item.months">
          <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
            <h3 text="right">{{ sub.month + 1 }}月（{{ sub.articles.length }}篇文章）</h3>
            <div bg="[var(--primary-color)]" h="min-4em full" w=".25em" pos="relative">
              <div
                pos="absolute"
                left="50%"
                top="50%"
                transform="translate-x-[-50%] translate-y-[-50%]"
                bg="[var(--primary-color)]"
                w="1em"
                h="1em"
                rounded="full"
                border=".25em solid white"
                shadow="md"
              />
            </div>
            <div />
          </li>
          <template v-for="ssub in sub.articles">
            <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
              <!-- <div text="right">{{ new Date(item.createAt).getDate() }}日</div> -->
              <div />
              <div bg="[var(--primary-color)]" h="4em" w=".25em" pos="relative">
                <div
                  pos="absolute"
                  left="50%"
                  top="50%"
                  transform="translate-x-[-50%] translate-y-[-50%]"
                  bg="[var(--primary-color)]"
                  w=".75em"
                  h=".75em"
                  rounded="full"
                  border=".125em solid white"
                  shadow="md"
                />
              </div>
              <nuxt-link :to="`/article/${ssub.id}`" text-inherit underline-transparent hover="text-[var(--primary-color)]">
                <span>{{ ssub.title }}</span>
                <span>
                  （{{ ssub.reads }}
                  <button class="i-solar-fire-bold" font-size="inherit" />
                  / {{ ssub._count.comments }}
                  <button class="i-mdi-comment-processing" font-size="inherit" />
                  ）
                </span>
              </nuxt-link>
            </li>
          </template>
        </template>
      </ul>
    </div>

    <!-- <template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template> -->
  </nuxt-layout>
</template>
