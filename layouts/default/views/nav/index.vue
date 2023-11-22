<script setup lang="ts"></script>

<template>
	<nav bg="[var(--theme-color5)]">
		<ul
			flex="~"
			gap="2em"
			list="none"
			justify="center"
			m="0"
			p="1em"
			border="0px t-1px b-3px solid [var(--border-color)]"
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
					color="[var(--text-color)]"
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
</template>
