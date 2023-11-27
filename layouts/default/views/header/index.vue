<script setup lang="ts">
const { hideHeight } = defineProps<{
	hideHeight?: number;
}>();

const { y } = $(useWindowScroll());

const isMounted = $(useMounted());

const needHide = computed(() => {
	if (!isMounted) return;
	return y < (hideHeight || document.documentElement.clientHeight) - 48;
});
</script>

<template>
	<header :class="needHide && 'hide'" flex="~" items="center">
		<nuxt-link to="/" underline="transparent" un-text="inherit 20px">WSの小屋</nuxt-link>
		<nav ml="auto">
			<ul
				flex="~" gap="2em" list="none" justify="center"
				m="0"
			>
				<li
					v-for="item in [
						{
							name: '首页',
							to: '/',
						},
						{
							name: '类型',
							to: '/type',
						},
						{
							name: '标签',
							to: '/tag',
						},
						{
							name: '归档',
							to: '/article',
						},
						{
							name: '留言板',
							to: '/guestbook',
						},
						{
							name: '关于',
							to: '/about',
						},
					]"
				>
					<nuxt-link
						hover="text-[var(--primary-color)]"
						color="inherit"
						underline="transparent"
						:to="item.to"
						:style="{
							textDecoration: $route.path == item.to ? 'underline' : '',
							color: $route.path == item.to ? 'var(--primary-color)' : '',
						}"
					>
						{{ item.name }}
					</nuxt-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="less" scoped>
header {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
	height: 48px;
  padding:0 36px;
  transition: all 0.3s;
  opacity: 1;
	background-color: rgb(255 255 255 / 90%);
  box-shadow: 0 0.5rem 1rem rgb(18 38 63 / 5%);
  color: rgb(0 0 0 / 90%);
	text-shadow: 0 0.1875rem 0.3125rem #1c1f2100;
  backdrop-filter: saturate(200%) blur(20px);

  &.hide {
    height: 72px;
    // opacity: 0;
    background-color: rgb(255 255 255 / 0%);
    box-shadow: 0 0.5rem 1rem rgb(18 38 63 / 0%);
    color: white;
    // text-shadow: 0 1px 1px rgb(0 0 0 / 34%);
		text-shadow: 0 0.1875rem 0.3125rem #1c1f21ff;
    backdrop-filter: saturate(100%) blur(0);
  }
}
</style>
