<script lang="ts" setup>
async function submit() {
	console.log("wkl");
}





</script>

<template tag="div">
	<!-- <the-table :action="() => $apis.list()" :submit="submit" :form="{ labelSuffix: '：' }">
		<template #top="{ drawer, dialog }">
			<el-button @click="
				Object.assign(dialog, {
					title: '修改',
					slot: 'add',
					show: true,
				})
			"></el-button>
		</template>
		<template #="{ params, drawer, form, checkList }">
			<el-table-column label="ID" prop="id"></el-table-column>
			<el-table-column label="NAME" prop="name"></el-table-column>
			<el-table-column label="SETTING" #="{ row }">
				<el-button type="primary" link @click="
					Object.assign(drawer, {
						title: '修改',
						slot: 'add',
						show: true,
					}),
					Object.assign(form, row)
				">
					修改
				</el-button>
			</el-table-column>
		</template>

		<template #add="{ dialog, drawer }">
			{{ (() => {
				drawer.title = "wdf";
			})() }}
			<div></div>

			<el-form-item label="hh">
				<el-input></el-input>
			</el-form-item>
		</template>
		<template #add-footer>
			123
		</template>
	</the-table> -->
	<div></div>
</template>

<style>
a {
	height: 100px;
	width: 100px;
}
</style>
