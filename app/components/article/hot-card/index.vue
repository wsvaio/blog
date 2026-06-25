<script setup lang="ts">
const { typeId } = defineProps<{
  typeId?: number | string;
}>();

const normalizedTypeId = computed(() => {
  const id = Number(typeId);
  return Number.isInteger(id) && id > 0 ? id : undefined;
});
const { data } = await useFetch("/api/article/hot", {
  query: computed(() =>
    normalizedTypeId.value ? { typeId: normalizedTypeId.value } : undefined,
  ),
  key: `article-hot-${normalizedTypeId.value ?? "all"}`,
  default: () => [],
});
</script>

<template>
  <section class="card tag-card">
    <header text="18px" flex="~ items-center">
      <span>🔥</span>
      <span>热门</span>
    </header>

    <ol mt="1em" m="0" p="0" list="inside" flex="~ col gap-.5em">
      <li v-for="item in data">
        <nuxt-link
          :to="`/article/${item.id}`"
          hover="text-[var(--primary-color)]"
          underline="transparent"
          color="inherit"
        >
          <span>{{ item?.title }}</span>
          <sup text="[var(--text-color1)]">{{ item.stats?.viewCount }}</sup>
        </nuxt-link>
      </li>
    </ol>
  </section>
</template>

<style lang="less" scoped></style>
