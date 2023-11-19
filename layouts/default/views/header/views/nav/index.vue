<script setup lang="ts"></script>

<template>
	<nav>
		<ul>
			<li>首页</li>
			<li>关于</li>
			<li>归档</li>
		</ul>
	</nav>
</template>

<style lang="less" scoped>
nav {
  & > ul {
    display: flex;
    margin: 0;
    padding: 0;
    font-size: 15.75px;
    line-height: 1;
    list-style: none;
    user-select: none;
    gap: .5em;

    &>li {
      padding: .5em;
      transition: background-color .3s;
      border-radius: .5em;

      &:hover {
        background-color: black;
      }
    }
  }
}
</style>
