<script setup lang="ts">
const main = useMainStore();

const { y } = $(useWindowScroll());

const isMounted = $(useMounted());

const needHide = computed(() => {
	if (!isMounted) return true;
	return y < (main.headerHideHiehgt || document.documentElement.clientHeight) - 48;
});

const headerRef = $ref<HTMLDivElement>();

let show = $ref(false);
let clientWidth = $ref(0);
useResizeObserver(
	() => headerRef,
	() => (clientWidth = headerRef?.clientWidth || 0)
);
</script>

<template>
	<header ref="headerRef" :class="needHide && 'hide'" flex="~" items="center">
		<nuxt-link to="/" underline="transparent" un-text="inherit 20px">WSの小屋</nuxt-link>
		<div flex="1" />
		<transition name="fade">
			<nav
				v-if="show || clientWidth >= 768"
				lt-md="pos-fixed h-100dvh w-100dvw left-0 top-0 bg-[var(--bg-color)] !text-[rgba(0,0,0,0.9)] !text-shadow-none"
			>
				<ul
					flex="~" gap="2em" list="none" justify="center"
					m="0" lt-md="flex-col items-center justify-center h-full"
				>
					<li
						v-for="item in [
							{
								name: '首页',
								to: '/',
							},
							// {
							// 	name: '类型',
							// 	to: '/type',
							// },
							// {
							// 	name: '标签',
							// 	to: '/tag',
							// },
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
							@click="show = false"
						>
							{{ item.name }}
						</nuxt-link>
					</li>
				</ul>
			</nav>
		</transition>

		<div
			v-if="clientWidth < 768"
			:class="!show ? 'i-ion:options-outline' : 'i-material-symbols:close-rounded'"
			text="24px"
			z="10000"
			cursor="pointer"
			:style="{
				color: show ? 'rgb(0 0 0 / 90%)' : undefined,
			}"
			@click="show = !show"
		/>
	</header>
</template>

<style lang="less" scoped>
header {
	@keyframes enter {
    0% {
      transform: translateY(-100%);
			opacity: 0;
    }

    100% {
      transform: translateY(0%);
			opacity: 1;
    }
  }

  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  height: 48px;
  padding: 0 36px;
  transition: all 0.3s;
	animation: enter .3s;
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
