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
						href: '/',
					},
					{
						name: '类型',
						href: '/type',
					},
					{
						name: '标签',
						href: '/tag',
					},
					{
						name: '归档',
						href: '/article',
					},
					{
						name: '留言板',
						href: '/guestbook',
					},
					{
						name: '关于',
						href: '/about',
					},
				]"
			>
				<a
					hover="text-[var(--secondary-color)]"
					color="[var(--text-color)]"
					underline="transparent"
					cursor="pointer"
					:href="item.href"
					:style="{
						textDecoration: $route.path == item.href ? 'underline' : '',
						color: $route.path == item.href ? 'var(--secondary-color)' : '',
					}"
				>
					{{ item.name }}
				</a>
			</li>
		</ul>
	</nav>
</template>
