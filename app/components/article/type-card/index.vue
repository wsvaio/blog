<script setup lang="ts">
const { typeId } = defineProps<{
  typeId?: number | string;
}>();

const bgImg = useWallpaper().randomImageUrl();

const normalizedTypeId = computed(() => {
  const id = Number(typeId);
  return Number.isInteger(id) && id > 0 ? id : undefined;
});

const { data: typeInfo } = await useFetch(`/api/type/${normalizedTypeId.value}`, {
  key: `type-info-${normalizedTypeId.value}`,
  immediate: !!normalizedTypeId.value,
});

const { data: scopedArticles } = await useFetch("/api/article", {
  query: computed(() =>
    normalizedTypeId.value ? { typeId: normalizedTypeId.value } : undefined,
  ),
  key: `type-articles-${normalizedTypeId.value ?? "all"}`,
  immediate: !!normalizedTypeId.value,
  default: () => [],
});

const { data: scopedTags } = await useFetch("/api/tag", {
  query: computed(() =>
    normalizedTypeId.value ? { typeId: normalizedTypeId.value } : undefined,
  ),
  key: `type-tags-${normalizedTypeId.value ?? "all"}`,
  immediate: !!normalizedTypeId.value,
  default: () => [],
});

const articleCount = computed(() => (scopedArticles.value ?? []).length);
const tagCount = computed(() => (scopedTags.value ?? []).length);
</script>

<template>
  <div class="type-card card" pos="relative" grid="~ rows-[0.384fr_1fr]" p="0">
    <div pos="relative" flex="~ col" items="center" pt="48px">
      <img
        :src="bgImg"
        w="full"
        h="full"
        pos="absolute"
        inset="0"
        aspect-ratio="square"
        object="cover"
        z="1"
        :style="{
          maskImage: 'linear-gradient(black 61.8%, transparent)',
          '-webkit-mask-image': 'linear-gradient(black 61.8%, transparent)',
        }"
      />
      <div
        text="36px"
        w="75px"
        h="75px"
        rounded="full"
        bg="[var(--card-bg)]"
        shadow="[0_1px_4px_rgba(100,110,120,.53)]"
        box="border"
        z="2"
        flex="~ items-center justify-center"
      >
        {{ typeInfo?.icon }}
      </div>
    </div>
    <div flex="~ col" items="center" p="t-0 2em">
      <h2 text="16px" font="normal" m="1em">{{ typeInfo?.name }}</h2>
      <p v-if="typeInfo?.description" mt="0" text="14px" opacity="0.85">
        {{ typeInfo.description }}
      </p>

      <hr bg="1px solid [#e7eaf1]" w="full" border="none" h="1px" mt="1em" />

      <ul flex="~" justify="between" m="0" p="0" list="none" w="full" items="center">
        <li flex="~ col" items="center">
          <span>{{ articleCount }}</span>
          <span>文章</span>
        </li>
        <li>|</li>
        <li flex="~ col" items="center">
          <span>{{ tagCount }}</span>
          <span>标签</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
