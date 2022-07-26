<script setup lang="ts">
import { usePagination, useRequest } from "vue-request";
import { FormInstance, PaginationProps, DrawerProps, FormProps, DialogProps } from "element-plus";
import { TableProps } from "element-plus/es/components/table/src/table/defaults";
import { debounce, assign } from "wsvaio";

const { action, submit: _submit = async () => { },
	listKey = "items", currentKey = "page", pageSizeKey = "pageSize",
	totalKey = "count", totalPageKey = "pageCount",

	form: _form = {},
	drawer: _drawer = {},
	dialog: _dialog = {}
} = defineProps<{
	action: (params: obj) => Promise<T>,
	submit?: (ctx: vtableCtx) => Promise<T>,
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
const formProps = reactive<Read<Partial<FormProps>> & obj>({});
const form = reactive<obj>({});

function close() {
	assign(form, {});
	Object.assign(drawer, { show: false, slot: "", ..._drawer });
	Object.assign(dialog, { show: false, slot: "", ..._dialog });
	Object.assign(formProps, _form);
	ruleFormRef?.clearValidate();
}

const drawer = reactive<Read<Partial<DrawerProps>> & obj & { show: boolean, slot: string }>({ show: false, slot: "" });
const drawerProps = computed(() => assignProps(_drawer, drawer));

const dialog = reactive<Read<Partial<DialogProps>> & obj & { show: boolean, slot: string }>({ show: false, slot: "" });
const dialogProps = computed(() => assignProps(_dialog, dialog));



watchEffect(() => {
	dialog.slot ? dialog.show = true : dialog.show = false;
	drawer.slot ? drawer.show = true : drawer.show = false;
});

function assignProps(obj1, obj2) {
	const result: T = { ...obj1, ...obj2 };
	delete result.show;
	delete result.slot;
	return result;
}

const { run: submit, loading: submiting } = $(useRequest(async (title="") => {
	if (drawer.show) await ruleFormRef?.validate();
	if (dialog.show) await ruleFormRef?.validate();
	if (title) drawer.title = dialog.title = title;
	return _submit(ctx).finally(() => title && (drawer.title = dialog.title = ""));
}, {
	manual: true,
	onSuccess(data) {
		if (!data) return;
		refresh();
		drawer.show = dialog.show = false;
	}
}));

const ctx = { params, checkList, drawer, dialog, form, formProps };
defineExpose(ctx);

</script>

<template>
	<el-form ref="ruleFormRef" :model="form" :="{ ..._form, ...formProps }" :disabled="submiting || loading">
		<div flex="~ wrap gap-x-12px gap-y-6px" class="items-center">
			<slot name="top" :="ctx" :loading="loading" :submiting="submiting"></slot>
		</div>

		<el-table v-loading="loading" m="t-15px" :data="data && data[listKey] || []"
			:="{ ...$attrs, ...$props.table }" @selection-change="list => { checkList.length = 0; checkList.push(...list); }">
			<slot :="ctx"></slot>
			<template #append>
				<slot name="bottom" :="ctx" :loading="loading" :submiting="submiting"></slot>
			</template>
		</el-table>

		<el-pagination v-model:currentPage="current" v-model:page-size="pageSize" m="t-25px" :total="total"
			:page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]" layout="total, sizes, prev, pager, next, jumper, ->, slot"
			:="$props.pagination"></el-pagination>

		<el-drawer v-model="drawer.show" :="drawerProps" :before-close="done => submiting || done()" @closed="close">
			<div v-loading="submiting">
				<slot :name="drawer.slot" :="ctx" :loading="loading" :submiting="submiting"></slot>
			</div>
			<template #footer>
				<slot :name="`${drawer.slot}-footer`" :="ctx" :loading="loading" :submiting="submiting">
					<el-button @click="drawer.show = false">取消</el-button>
					<el-button type="primary" @click="submit()">确定</el-button>
				</slot>
			</template>
		</el-drawer>

		<el-dialog v-model="dialog.show" :="dialogProps" :before-close="done => submiting || done()" @closed="close">
			<div v-loading="submiting">
				<slot :name="dialog.slot" :="ctx" :loading="loading" :submiting="submiting"></slot>
			</div>
			<template #footer>
				<slot :name="`${dialog.slot}-footer`" :="ctx" :loading="loading" :submiting="submiting">
					<el-button @click="dialog.show = false">取消</el-button>
					<el-button type="primary" @click="submit()">确定</el-button>
				</slot>
			</template>
		</el-dialog>
	</el-form>
</template>
