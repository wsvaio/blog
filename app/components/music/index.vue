<script setup lang="ts">
declare const APlayer: any;

const divRef = $ref<HTMLDivElement>();
const { data } = $(await useFetch<any[]>("/api/music"));

onMounted(() => {
  const _ = new APlayer({
    container: divRef,
    fixed: true,
    lrcType: 3,

    audio: data?.map((item: any) => ({
      artist: item.artist,
      name: item.name,
      cover: toFileUrl(item.coverId),
      url: toFileUrl(item.fileId),
      lrc: toFileUrl(item.lrcId),
    })),
  });
});
</script>

<template>
  <!-- transform="translate-x-[-66px] hover:translate-x-[0px]" transition="all .3s" -->
  <div id="aplayer" ref="divRef" :class="[]" />
</template>

<!-- <style lang="less">
#aplayer {
	transform: translateX(0%);
	transition: transform .3s;

	&.aplayer-narrow {
		transform: translateX(-100%);
	}

	&:has(.aplayer-miniswitcher:hover), &:has(.aplayer-body:hover) {
		transform: translateX(0%);
	}
}
</style> -->
