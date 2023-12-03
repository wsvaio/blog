<script setup lang="ts">
const { articleId = "" } = defineProps<{
	articleId: string;
}>();

const isMounted = $(useMounted());
const route = useRoute();

let { y } = $(useWindowScroll({ behavior: "smooth" }));

const titles = $computed(() => {
	if (!isMounted) return [];
	const doc = document.getElementById(articleId);
	if (!doc) return [];
	return resolveArticleTitles(doc);
});
const titleTags = $computed(() => [...new Set(titles?.map(item => item.el.nodeName))]);

const active = $computed(() => {
	if (!isMounted) return;
	// 把y的作用加进去
	if (y == -1) return;
	return [...titles]?.reverse()?.find(item => {
		// *** el 与 item.el 不相等了，可能是markdown-preview挂载了两次
		const el = document.getElementById(item.el.id);
		return (el?.getBoundingClientRect().y || 0) <= 256;
	})?.el || document.getElementById(titles[0]?.el.id);
});

const sliderStyle = computed(() => {
	console.log(titles && isMounted && true);
	let a = document.getElementById(`catalog-${active?.id}`);
	return {
		top: `${a?.offsetTop || 0}px`,
		height: `${a?.clientHeight || 0}px`
	};
});

// 文章目录联动之 滚动至当前标题
watch(
	() => [route.hash, titles],
	() => {
		const el = document.getElementById(route.hash.slice(2));
		if (!el) return;
		const rect = el.getBoundingClientRect();
		console.log(rect);
		y += rect.y - 56;
	}
);
</script>

<template>
	<section v-if="titles?.length" class="catalog-card card" flex="~">
		<!-- <header text="18px" mb="1em">文章目录</header> -->
		<!-- <deep-ul :list="titles" /> -->
		<!-- <div flex="~"> -->

		<ul
			m="0" p="0" list="none" bg="[var(--primary-color4)]"
			w="2px" pos="relative"
		>
			<li
				bg="[var(--primary-color)]"
				h="1.5em"
				w="2px"
				pos="absolute"
				:style="sliderStyle"
				transition="all"
			/>
		</ul>
		<ul
			m="0" p="0" list="none" lh="[1.5em]"
			flex="1" pos="relative"
		>
			<li
				v-for="item in titles"
				:id="`catalog-${item.el.id}`"
				:style="{
					paddingLeft: `${titleTags.indexOf(item.el.nodeName) + 1}em`,
				}"
			>
				<nuxt-link
					:to="`##${item.el.id}`"
					underline="transparent"
					transition="all"
					:style="{
						fontWeight: item.el.id == active?.id ? 'bold' : 'normal',
						color: item.el.id == active?.id ? 'var(--primary-color)' : 'inherit',
						fontSize: `${(6 - titleTags.indexOf(item.el.nodeName)) / 18 + 0.66666666666}em`,
					}"
				>
					{{ item.el.innerHTML }}
				</nuxt-link>
			</li>
		</ul>
		<!-- </div> -->
	</section>
</template>
