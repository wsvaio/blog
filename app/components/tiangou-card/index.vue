<script setup lang="ts">
const { data, execute } = await useFetch<any>("/api/common/tiangou");
</script>

<template>
  <section class="card tiangou-card">
    <header text="18px" flex="~ items-center">
      <span>🐕</span>
      <span>舔狗日记</span>
      <div cursor="pointer" class="i-material-symbols:sync" ml="auto" @click="execute()" />
    </header>

    <typewriter :content="data.content" mt="1em" lh="[1.5]" :delete-speed="10" />
  </section>
</template>

<style lang="less" scoped></style>
