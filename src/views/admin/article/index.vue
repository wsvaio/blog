<script lang="ts" setup>
import { merge, dateFormat } from "wsvaio";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import vvv from "@/routes/vrouter/index.vue";
import "@wangeditor/editor/dist/css/style.css";
import abc from "@wangeditor/editor/dist/css/style.css?raw";
const submit = async ({ dialog, drawer, form, checkList }: vtableCtx) => {

	const title = dialog.title || drawer.title;

	if (title == "添加") {
		await addArticle({ body: form, success: "添加成功" });
	}
	else if (title == "查看详情") {
		await editArticle({ body: form, success: "修改成功" });
	}
	else if (title == "删除") {
		await delArticle({ query: { _ids: checkList.map(item => item._id) } });
	}

	return true;
};

const editorRef = $shallowRef<T>();
onBeforeUnmount(() => editorRef && editorRef.destroy());

const tags = ref();
moreTag({ query: { page: 1, pageSize: 10 } }).then(data => {
	tags.value = data.items;
});
</script>

<template tag="div" class="about">
	<vtable :action="query => $apis.moreArticle({ query })" :submit="submit" :border="true">
		<template #top="{ dialog, submit: sbt, checkList, params }">
			<n-input v-model:value="params.key" w="!250px" :color="'blue'"></n-input>
			<n-button m="l-auto" type="primary" @click="merge(dialog, { title: '添加', slot: 'add' })">添加</n-button>
			<n-button @click="$apis.ttttttt()">test</n-button>
			<n-popconfirm @positive-click="sbt('删除')">
				你确定要删除吗？
				<template #trigger>
					<n-button type="error" :disabled="checkList.length <= 0" :title="checkList.length <= 0 ? '请选择删除项' : ''">删除</n-button>
				</template>
			</n-popconfirm>
		</template>


		<template #="{ dialog, form }">
			<el-table-column type="selection" :align="'center'"></el-table-column>
			<el-table-column sortable prop="_id" label="ID"></el-table-column>
			<el-table-column sortable prop="content" label="内容" #="{ row }">
				<span class="clamp-2" v-html="row.content"></span>
			</el-table-column>
			<el-table-column sortable prop="updated_at" label="修改日期" #="{ row }">{{ dateFormat(row.created_at) }}</el-table-column>
			<el-table-column sortable prop="created_at" label="创建日期" #="{ row }">{{ dateFormat(row.updated_at) }}</el-table-column>
			<el-table-column label="操作" #="{ row }">
				<el-link type="primary" @click="merge(dialog, { title: '查看详情', slot: 'add' }), merge(form, row)">查看详情</el-link>
			</el-table-column>
		</template>


		<template #add="{ dialog, form }: vtableCtx">
			{{ merge(form, {ids: []}, {rtn: false}) }}
			{{ form }}
			<el-form-item :show-message="false" prop="title" :rules="[{ required: true, message: '请输入标题' }]">
				<el-input v-model="form.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item :show-message="false" prop="ids" :rules="[{ required: true, message: '请选择标签' }]">
				<el-select v-model="form.ids" w="full" multiple clearable>
					<el-option v-for="item in tags" :value="item._id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :show-message="true" prop="content" :rules="[{ required: true, message: '请输入内容'}]">
				<Toolbar un:border="1px solid [var(--bColor)]" :editor="editorRef" :default-config="{
					excludeKeys: ['uploadVideo', 'insertVideo']
				}" class="editor"></Toolbar>
				<Editor v-model="form.content" h="!500px" w="full" un:border="1px t-0 solid [var(--bColor)]" class="editor"
					:default-config="{
						'MENU_CONF': {
							uploadImage: {
								base64LimitSize: 1024 * 1024 * 100
							}
						},
						'placeholder': '写点什么……'
					}"
					@on-created="editor => editorRef = editor"></Editor>
			</el-form-item>
		</template>
		<template #add-submit-text="{ dialog }:vtableCtx">{{ dialog.title == "查看详情" ? "修改" : "确定" }}</template>
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

.editor {
	--bColor: #ccc;
}
.is-error .editor {
	--bColor: var(--el-color-danger);
}
</style>
