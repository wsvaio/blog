<script lang="ts" setup>
import { merge, dateFormat } from "wsvaio";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
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
		<template #top="{ dialog, submit: sbt, checkList, params, form }">
			<!-- <div w="250px"><el-input v-model="params.key" :disabled="false"></el-input></div> -->
			<n-input v-model:value="params.key" w="!250px"></n-input>
			<el-button m="l-auto" type="primary" @click="merge(form, { 'tag_ids': [] }), merge(dialog, { title: '添加', slot: 'add' })">添加</el-button>
			<el-popconfirm #reference title="您确定要删除吗？" @confirm="sbt('删除')">
				<el-button type="danger" :disabled="checkList.length <= 0" :title="checkList.length <= 0 ? '请选择删除项' : ''">删除</el-button>
			</el-popconfirm>
		</template>


		<template #="{ dialog, form }">
			<el-table-column type="selection" :align="'center'"></el-table-column>
			<el-table-column sortable prop="_id" label="ID"></el-table-column>
			<el-table-column sortable prop="title" label="标题"></el-table-column>
			<el-table-column sortable prop="tag_ids" label="标签" #="{row}">
				<el-tag v-for="item in row.tag_ids">{{ (tags ?? []).find(sub => sub._id == item)?.name }}</el-tag>
			</el-table-column>
			<!-- <el-table-column sortable prop="content" label="内容" #="{ row }">
				<span class="clamp-2" v-html="row.content"></span>
			</el-table-column> -->
			<el-table-column sortable prop="updated_at" label="修改日期" #="{ row }">{{ dateFormat(row.created_at) }}</el-table-column>
			<el-table-column sortable prop="created_at" label="创建日期" #="{ row }">{{ dateFormat(row.updated_at) }}</el-table-column>
			<el-table-column sortable prop="_id" label="操作" #="{ row }">
				<el-link type="primary" @click="merge(form, row), merge(dialog, { title: '查看详情', slot: 'add' })">查看详情</el-link>
			</el-table-column>
		</template>


		<template #add="{ dialog, form }: vtableCtx">
			<el-form-item :show-message="false" prop="title" required>
				<el-input v-model="form.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item :show-message="false" prop="tag_ids" required>
				<el-select v-model="form.tag_ids" w="full" multiple clearable placeholder="请选择标签">
					<el-option v-for="item in tags" :value="item._id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :show-message="false" prop="content" :rules="[{ validator: (rule, value, callback) => callback(value && value != '<p><br></p>' ? undefined : '请输入内容')}]">
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

.el-tag+.el-tag {
	margin-left: 12px;
}

</style>
