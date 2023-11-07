<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data } = await useFetch<any>(`/api/tag/${id}`);
</script>

<template>
  <article m="x-auto" max="w-[var(--max-width)]" p="1em">
    {{ data }}
  </article>
</template>
