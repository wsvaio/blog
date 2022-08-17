<script setup lang='ts'>
import Header from "./components/header/index.vue";
import Footer from "./components/footer/index.vue";
import Banner from "./components/banner/index.vue";
</script>

<template>
	<Header></Header>
	<Banner></Banner>
	<router-view></router-view>
	<Footer></Footer>
</template>

<style lang='less' scoped>

</style>