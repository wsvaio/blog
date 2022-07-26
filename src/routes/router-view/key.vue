<template>
  <router-view #="{ Component }">
    <component :key="$route.path" :is="Component"></component>
  </router-view>
</template>
