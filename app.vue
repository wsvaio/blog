<script setup lang="ts">
let a = "1";

const handleClick = () => {
	log(1);
};
</script>

<template>
	<h1 @click="handleClick">Hello World ！</h1>
</template>
