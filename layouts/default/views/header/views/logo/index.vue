<script setup lang="ts"></script>

<template>
	<div class="logo">
		<img alt="logo" />
		<span class="title">title</span>
		<span class="subtitle">subtitle</span>
	</div>
</template>

<style lang="less" scoped>
.logo {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content max-content;
  line-height: 1;

  & > img {
    grid-row: -1 / 1;
  }

  &>.title {
    font-size: 22.5px;
  }

  &>.subtitle {
    font-size: 8.1px;
  }
}
</style>
