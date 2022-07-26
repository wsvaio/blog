<script setup lang="ts">
import { usePagination, useRequest } from "vue-request";
import { FormInstance, PaginationProps, DrawerProps, FormProps } from "element-plus";
import { TableProps } from "element-plus/es/components/table/src/table/defaults";
import { debounce, assign } from "wsvaio";

const { action, submit = Promise.resolve,
  listKey = "items", currentKey = "page", pageSizeKey = "pageSize",
  totalKey = "count", totalPageKey = "pageCount",
} = defineProps<{
  action: (params: object) => Promise<T>,
  submit?: (ctx: context) => Promise<T>,
  listKey?: string, currentKey?: string, pageSizeKey?: string,
  totalKey?: string, totalPageKey?: string,

  pagination?: Partial<PaginationProps>,
  drawer?: Partial<DrawerProps>,
  form?: Partial<FormProps>,
  table?: Partial<TableProps<any>>,
}>();

const columnList = computed(() => data?.[listKey] || []);
const checkList = reactive<object[]>([]);
const params = reactive<object>({});
watch(params, debounce(() => refresh(), 500));

const { data, loading, current, total, pageSize, refresh }
  = $(usePagination((data) => action({ ...data, ...params }), {
    pagination: { currentKey, pageSizeKey, totalPageKey, totalKey },
  }));

const ruleFormRef = $ref<FormInstance>();
const drawer = reactive({ show: false, title: "", slot: "", size: '30%' });
const form = reactive<object>({});


const { refresh: submited, loading: submiting } = $(useRequest(async () => {
  if (drawer.show) await ruleFormRef?.validate();
  return submit({ params, checkList, drawer, form }).finally(() => drawer.show || (drawer.title = ""));
}, {
  manual: true,
  onSuccess(data) {
    drawer.show = false;
    data && refresh();
  },
}));

const ctx = { params, checkList, drawer, form, submited, refresh };


</script>

<template>

  <div flex="~ wrap gap-x-12px gap-y-6px" class="items-center">
    <slot name="top" :="ctx" :loading="loading" :submiting="submiting"></slot>
  </div>

  <el-table max-height="calc(100vh - 280px)" m="t-15px" :border="true" :data="columnList" v-loading="loading || submiting && !drawer.show"
  @selection-change="list => { checkList.length = 0; checkList.push(...list); }" :="{ ...$attrs, ...$props.table }">
    <slot :="ctx" :loading="loading" :submiting="submiting"></slot>
    <template #append>
      <slot name="bottom" :="ctx" :loading="loading" :submiting="submiting"></slot>
    </template>
  </el-table>

  <el-pagination m="t-25px" :total="total"
  v-model:currentPage="current" v-model:page-size="pageSize"
  :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
  layout="total, sizes, prev, pager, next, jumper, ->, slot"
  :="$props.pagination"></el-pagination>

  <el-drawer v-model="drawer.show" :title="drawer.title" :size="drawer.size"
  @close="assign(form, {}), Object.assign(drawer, { title: '', size: '30%' })"
  @open="ruleFormRef?.clearValidate()" :="$props.drawer">

    <el-form ref="ruleFormRef" v-loading="submiting" :model="form"
    :hide-required-asterisk="true" :="$props.form">
      <slot :name="drawer.slot" :="ctx" :loading="loading" :submiting="submiting"></slot>
    </el-form>

    <template #footer>
      <slot name="footer" :="ctx" :loading="loading" :submiting="submiting">
        <el-button @click="drawer.show = false">取消</el-button>
        <el-button type="primary" @click="submited" :disabled="submiting">确定</el-button>
      </slot>
    </template>
  </el-drawer>



</template>

<style lang="less" scoped>
:deep(.el-button+.el-button) {
  margin-left: 0px;
}
</style>

