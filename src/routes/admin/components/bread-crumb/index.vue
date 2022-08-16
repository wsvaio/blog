<script lang="ts" setup>



const route = useRoute();


</script>

<template>
  <div class="bread-crumbs-wrap">
    <el-breadcrumb separator-icon="i-ArrowRight">
      <el-breadcrumb-item to="/">
        <img class="block -my-5px" src="@/assets/home.png" alt="HOME">
      </el-breadcrumb-item>
      <transition-group tag="div" mode="out-in">
        <template v-for="item in $route.matched">
          <el-breadcrumb-item :key="item.name" :to="{ name: item.name, params: route.params }" v-if="item.meta?.title">{{ item.meta?.title }}</el-breadcrumb-item>
        </template>
      </transition-group>

    </el-breadcrumb>
  </div>
</template>


<style lang="less" scoped>
.bread-crumbs-wrap {
  padding: 10px;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-active {
  transition: all 0.333s ease;
}

.v-leave-active {
  transition: all 0.333s ease;
  display: inline-block;
  position: absolute;
}
</style>
