<script lang="ts" setup>

import { adminRoutes } from "@/routes";

import RootNav from "../root-nav/index.vue";


const state = reactive({ isCollapse: false });

const route = useRoute();

function changeCollapse() {
  state.isCollapse = !state.isCollapse;
}

const active = computed(() => {
  if (route.matched.at(-1)?.meta.icon) return String(route.name);
  else return String(route.matched.at(-2)?.name);
});

</script>

<template>
	<el-aside class="layout-aside" :width="state.isCollapse ? `64px` : `200px`">
		<div class="logo"></div>

		<el-menu background-color="#001529" text-color="#eee" active-text-color="#fff"
			:default-active="active" :collapse="state.isCollapse">
			<root-nav :list="adminRoutes"></root-nav>
		</el-menu>

		<div class="fold" @click="changeCollapse">
			<el-icon v-show="!state.isCollapse">
				<i-arrow-left-bold></i-arrow-left-bold>
			</el-icon>
			<el-icon v-show="state.isCollapse">
				<i-arrow-right-bold></i-arrow-right-bold>
			</el-icon>
		</div>
	</el-aside>
</template>

<style lang="less">
.layout-aside {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #001529;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  user-select: none;

  .logo {
    height: 56px;
    background: url("@/assets/admin.png") no-repeat center / 40px 40px, #002140;
  }

  .el-menu {
    flex: 1;
    border-right: none;
    overflow: hidden;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .fold {
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background-color: #002140;

    &:hover {
      cursor: pointer;
    }
  }


  /* 激活选中菜单 */
  .el-menu-item.is-active,
  .el-menu--popup .el-menu-item.is-active {
    background-color: #1890ff !important;
  }

  .el-menu--collapse {

    // 收起样式
    .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none;
      }

      span {
        display: none;
      }
    }
  }
}
</style>
