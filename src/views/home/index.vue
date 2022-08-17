<script lang="ts" setup>
import { usePagination, useRequest } from "vue-request";


const { data, error, loading } = usePagination(query => moreArticle({query}), {
	pagination: {
		currentKey: "page",
		pageSizeKey: "pageSize",
		totalKey: "count"
	}
});


</script>




<template tag="div" class="home">
	<ul>
		<li v-for="item in data?.items">
			<h2>{{ item.title }}</h2>
			<h3 v-html="item.content"></h3>
		</li>
	</ul>
</template>

<style lang="less" scoped>
.home {
	// font-size: 250px;
}
</style>
