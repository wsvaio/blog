<script lang="ts" setup>
import { merge, dateFormat } from "wsvaio";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
const submit = async ({ dialog, drawer, form, checkList }: vtableCtx) => {

	const title = dialog.title || drawer.title;

	if (title == "添加") {
		await addTag({ body: form, success: "添加成功" });
	}
	else if (title == "修改") {
		await editTag({ body: form, success: "修改成功" });
	}
	else if (title == "删除") {
		await delTag({ query: { _ids: checkList.map(item => item._id) } });
	}

	return true;
};

const editorRef = $shallowRef<T>();
onBeforeUnmount(() => editorRef && editorRef.destroy());


</script>

<template tag="div" class="about">
	<vtable :action="query => $apis.moreTag({ query })" :submit="submit" :border="true">
		<template #top="{ dialog, submit: sbt, checkList, params }">
			<div w="250px"><el-input v-model="params.key"></el-input></div>
			<el-button m="l-auto" type="primary" @click="merge(dialog, { title: '添加', slot: 'add' })">添加</el-button>
			<el-popconfirm #reference title="您确定要删除吗？" @confirm="sbt('删除')">
				<el-button type="danger" :disabled="checkList.length <= 0" :title="checkList.length <= 0 ? '请选择删除项' : ''">删除</el-button>
			</el-popconfirm>
		</template>


		<template #="{ dialog, form }">
			<el-table-column type="selection" :align="'center'"></el-table-column>
			<el-table-column sortable prop="_id" label="ID"></el-table-column>
			<el-table-column sortable prop="name" label="标签名"></el-table-column>
			<el-table-column sortable prop="updated_at" label="修改日期" #="{ row }">{{ dateFormat(row.created_at) }}</el-table-column>
			<el-table-column sortable prop="created_at" label="创建日期" #="{ row }">{{ dateFormat(row.updated_at) }}</el-table-column>
			<el-table-column sortable prop="_id" label="操作" #="{ row }">
				<el-link type="primary" @click="merge(dialog, { title: '修改', slot: 'add' }), merge(form, row)">修改</el-link>
			</el-table-column>
		</template>


		<template #add="{ dialog, form, formProps }: vtableCtx">
			{{ merge(dialog, { width: 400 }, {rtn: false}) }}
			<el-form-item prop="name" :show-message="false" :rules="[{ required: true, message: '请输入标签名' }]">
				<el-input v-model="form.name" placeholder="请输入标签名" size="large"></el-input>
			</el-form-item>
		</template>
	</vtable>
</template>

<style lang="less" scoped>
.clamp-2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

}
</style>
