<script setup lang="ts">
const { articleId, commentId } = defineProps<{
	articleId: number;
	commentId?: number;
}>();

const emit = defineEmits<{
	submit: [];
}>();

const load = reactive({
	name: "",
	email: "",
	content: "",
	avatar: "",
});

const { execute, error } = useAsyncData(() => {
	if (commentId) {
		return $fetch(`/api/comment/${commentId}/comment`, {
			method: "POST",
			body: {
				...load,
			},
			onResponse() {
				emit("submit");
			},

		});
	}
	else {
		return $fetch(`/api/article/${articleId}/comment`, {
			method: "POST",
			body: {
				...load,
			},
			onResponse() {
				emit("submit");
				Object.assign(load, {
					name: "",
					email: "",
					content: "",
					avatar: "",
				});
			},

		});
	}
});
</script>

<template>
	<div class="comment-on">
		<vtextarea v-model="load.content" placeholder="见到你很高兴！" />

		<div grid="~ cols-[max-content_1fr_1fr_1fr] rows-[1fr_1fr]" gap="1em" mt="1em">
			<img src="/favicon.ico" w="64px" h="64px" border="1px solid [var(--border-color7)]" />
			<vinput v-model="load.name" placeholder="昵称" />
			<vinput v-model="load.email" placeholder="邮箱" />
			<vinput placeholder="网站" />
			<button grid="col-span-full" @click="execute()">发送</button>
		</div>

		<p text="[var(--error-color)]">{{ (error as any)?.data?.message || error?.message }}</p>
	</div>
</template>
