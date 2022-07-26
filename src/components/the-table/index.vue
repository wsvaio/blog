<script setup lang="ts">
import { usePagination, useRequest } from "vue-request";
import { FormInstance, PaginationProps, DrawerProps, FormProps, DialogProps } from "element-plus";
import { TableProps } from "element-plus/es/components/table/src/table/defaults";
import { debounce, assign } from "wsvaio";

const {
	action, submit: _submit = async() => { },
	listKey = "items", currentKey = "page", pageSizeKey = "pageSize",
	totalKey = "count", totalPageKey = "pageCount",

	form: _form = {},
	drawer: _drawer = {},
	dialog: _dialog = {}
} = defineProps<{
	action: (params: obj) => Promise<T>,
	submit?: (ctx: context) => Promise<T>,
	listKey?: string, currentKey?: string, pageSizeKey?: string,
	totalKey?: string, totalPageKey?: string,

	pagination?: Partial<PaginationProps>,
	drawer?: Partial<DrawerProps>,
	dialog?: Partial<DialogProps>,
	form?: Partial<FormProps>,
	table?: Partial<TableProps<any>>,
}>();

const checkList = reactive<obj[]>([]);
const params = reactive<obj>({});
watch(params, debounce(() => refresh(), 500));

const { refresh, data, loading, pageSize, total, current } = $(usePagination((data) => action({ ...data, ...params }), {
	pagination: { currentKey, pageSizeKey, totalPageKey, totalKey }

}));

const ruleFormRef = $ref<FormInstance>();
const drawer = reactive<Read<Partial<DrawerProps>> & obj>({ show: false, title: "", slot: "" });
const drawerProps = computed(() => {
	const result: T = { ..._drawer, ...drawer };
	delete result.show;
	delete result.slot;
	return result;
});
const dialog = reactive<Read<Partial<DialogProps>> & obj>({ show: false, title: "", slot: "" });
const dialogProps = computed(() => {
	const result: T = { ..._dialog, ...dialog };
	delete result.show;
	delete result.slot;
	return result;
});

const formProps = reactive<Read<Partial<FormProps>> & obj>({});

const form = reactive<obj>({});

const { refresh: submit, loading: submiting } = useRequest(async() => {
	if (drawer.show) await ruleFormRef?.validate();
	if (dialog.show) await ruleFormRef?.validate();
	return _submit(ctx).finally(close);
}, {
	manual: true,
	onSuccess(data) {
		drawer.show = false;
		data && refresh();
	}
});

const ctx = { params, checkList, drawer, dialog, form, formProps };

defineExpose(ctx);

function close() {
	assign(form, {});
	assign(drawer, { show: false, slot: "", ..._drawer });
	assign(dialog, { show: false, slot: "", ..._dialog });
	assign(formProps, _form);
}

</script>

<template>
	<div flex="~ wrap gap-x-12px gap-y-6px" class="items-center">
		<slot name="top" :="ctx" :loading="loading" :submiting="submiting"></slot>
	</div>
	<el-table v-loading="loading || submiting" m="t-15px" :data="data && data[listKey] || []"
		:="{ ...$attrs, ...$props.table }" @selection-change="list => { checkList.length = 0; checkList.push(...list); }">
		<slot :="ctx"></slot>
		<template #append>
			<slot name="bottom" :="ctx" :loading="loading" :submiting="submiting"></slot>
		</template>
	</el-table>

	<el-pagination v-model:currentPage="current" v-model:page-size="pageSize" m="t-25px" :total="total"
		:page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]" layout="total, sizes, prev, pager, next, jumper, ->, slot"
		:="$props.pagination"></el-pagination>

	<el-form ref="ruleFormRef" :model="form" :="{ ..._form, ...formProps }">
		<el-drawer v-model="drawer.show" :="drawerProps" @open="ruleFormRef?.clearValidate()" @close="close">
			<div v-loading="submiting">
				<slot :name="drawer.slot" :="ctx" :loading="loading" :submiting="submiting"></slot>
			</div>
			<template #footer>
				<slot :name="`${drawer.slot}-footer`" :="ctx" :loading="loading" :submiting="submiting">
					<el-button @click="drawer.show = false">
						取消
					</el-button>
					<el-button type="primary" :disabled="submiting" @click="submit">
						确定
					</el-button>
				</slot>
			</template>
		</el-drawer>

		<el-dialog v-model="dialog.show" :="dialogProps" @open="ruleFormRef?.clearValidate()" @close="close">
			<div v-loading="submiting">
				<slot :name="dialog.slot" :="ctx" :loading="loading" :submiting="submiting"></slot>
			</div>
			<template #footer>
				<slot :name="`${dialog.slot}-footer`" :="ctx" :loading="loading" :submiting="submiting">
					<el-button @click="dialog.show = false">
						取消
					</el-button>
					<el-button type="primary" :disabled="submiting" @click="submit">
						确定
					</el-button>
				</slot>
			</template>
		</el-dialog>
	</el-form>
</template>
