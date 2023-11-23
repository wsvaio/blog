<script setup lang="ts">
const { y } = $(useWindowScroll());
</script>

<template>
	<header :class="y <= 0 && 'hide'">
		<nav flex="~" items="center" max="w-[var(--max-width)]" mx="auto">
			<img src="@/assets/img/bear.webp" w="64px" h="64px" />
			<ul
				flex="~" gap="2em" list="none" justify="center"
				m="0 l-auto" p="1em"
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
						hover="text-[var(--secondary-color)]"
						color="inherit"
						underline="transparent"
						:to="item.to"
						:style="{
							textDecoration: $route.path == item.to ? 'underline' : '',
							color: $route.path == item.to ? 'var(--secondary-color)' : '',
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
  position: sticky;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  transition: all 0.3s;
  opacity: 1;
  background-color: rgb(255 255 255 / 90%);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  color: #666;
  backdrop-filter: saturate(200%) blur(20px);

  &.hide {
    padding: 0.5em;
    // opacity: 0;
    background-color: rgb(255 255 255 / 0%);
    box-shadow: 0 2px 5px rgb(0 0 0 / 0%);
    color: white;
    text-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    backdrop-filter: saturate(100%) blur(0);
  }
}
</style>
