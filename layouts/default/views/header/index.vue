<script setup lang="ts">
const { y } = $(useWindowScroll());
</script>

<template>
	<header :class="y <= 0 && 'hide'" flex="~" items="center">
		<img src="@/assets/img/bear.webp" w="64px" h="64px" />
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
  padding: 0 36px;
  transition: all 0.3s;
  opacity: 1;
	background-color: rgb(255 255 255 / 80%);
  box-shadow: 0 5px 6px -5px rgb(133 133 133 / 60%);
  color: #666;
  backdrop-filter: saturate(200%) blur(20px);

  &.hide {
    padding: 0.5em 36px;
    // opacity: 0;
    background-color: rgb(255 255 255 / 0%);
    box-shadow: 0 5px 6px -5px rgb(133 133 133 / 0%);
    color: white;
    text-shadow: 0 1px 1px rgb(0 0 0 / 34%);
    backdrop-filter: saturate(100%) blur(0);
  }
}
</style>
