<script lang="ts" setup>


async function submit({ drawer, params, form, checkList }: context) {


	return false;
}






</script>

<template tag="div">
	<ws-table list-key="items" page-size-key="pageSize" current-key="page" total-key="count" :action="params => $apis.list(params)" :submit="submit">
		<template #top="{}">
			<div w="250px">
				<el-input placeholder="搜索"></el-input>
			</div>

			<div flex="1"></div>

			<el-button type="primary" @click="$apis.test1({ success: '请求发送成功' })">
				添加
			</el-button>
			<el-button type="danger">
				删除
			</el-button>
		</template>

		<template #="{ params, drawer, form, checkList, submited, refresh }">
			<el-table-column label="ID" prop="id"></el-table-column>
			<el-table-column label="NAME" prop="name"></el-table-column>
			<el-table-column label="SETTING" #="{ row }">
				<el-button type="text" @click="
					Object.assign(drawer, {
						title: '修改',
						slot: 'edit',
						show: true,
					}),
					Object.assign(form, row)
				">
					修改
				</el-button>
			</el-table-column>
		</template>


		<template #edit="{ params, drawer, form, checkList, submited, refresh }">
			<el-form-item label="NAME">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		</template>
	</ws-table>
</template>

<style lang="less" scoped>
</style>

