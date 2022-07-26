<script lang="ts" name="keep-alive" setup>
const { nameList } = $(mainStore());
</script>

<template>
  <router-view #="{ Component }">
    <keep-alive :include="nameList">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

</template>
