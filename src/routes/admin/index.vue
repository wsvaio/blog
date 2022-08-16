<script lang="ts" setup>
import Aside from "./components/aside/index.vue";
import Header from "./components/header/index.vue";
import Main from "./components/main/index.vue";
import Tab from "./components/tab/index.vue";
import copyright from "./components/copyright/index.vue";


</script>

<template>
	<el-container class="layout">
		<Aside></Aside>
		<el-container>
			<Header></Header>
			<Tab></Tab>
			<Main></Main>
			<el-footer height="auto">
				<copyright></copyright>
			</el-footer>
		</el-container>
	</el-container>
</template>

<style lang="less" scoped>
.layout {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f3f6f8;

  .el-container {
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
    background: linear-gradient(white 0%, white 100%) top / 100% 90px no-repeat;
    position: relative;

    .el-main {
      padding: 16px;
      overflow: visible;
    }

    .el-footer {
      text-align: center;
      padding: 12px;
    }
  }
}
</style>