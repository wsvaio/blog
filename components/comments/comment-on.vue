<script setup lang="ts">
const { articleId, commentId } = defineProps<{
	articleId: number;
	commentId?: number;
}>();

const emit = defineEmits<{
	submit: [];
}>();

const user = useUserStore();

const load = reactive({
	name: "",
	email: "",
	content: "",
	avatar: "",
	site: "",
});

const { execute, error } = useLazyAsyncData(
	() => {
		if (commentId) {
			return $fetch(`/api/comment/${commentId}/comment`, {
				method: "POST",
				body: {
					...load,
				},
				onResponse(data) {
					if (data.response.status === 200) emit("submit");
				},
			});
		}
		else {
			return $fetch(`/api/article/${articleId}/comment`, {
				method: "POST",
				body: {
					...load,
				},
				onResponse(data) {
					if (data.response.status === 200) {
						emit("submit");
						Object.assign(load, {
							content: "",
						});
					}
				},
			});
		}
	},
	{
		immediate: false,
	}
);

const { data: avatar, execute: executeAvatar } = $(
	useLazyFetch<{ content: string }>("/api/common/pp", {
		onResponse(data) {
			if (data.response.status == 200) load.avatar = avatar?.content || "";
		},
	})
);

const handleEmailInput = useDebounceFn(async () => {
	if (!load.email) return;
	const user = await $fetch(`/api/user/email/${load.email}`);
	if (user) Object.assign(load, user);
}, 1000);
</script>

<template>
	<form class="comment-on" @submit.prevent="execute()">
		<vtextarea v-model="load.content" placeholder="见到你很高兴！" :input="{ required: 'true' }" />

		<div grid="~ cols-[max-content_1fr_1fr_1fr]" gap="1em" mt="1em">
			<img
				:src="load?.avatar" w="64px" h="64px" border="1px solid [var(--border-color7)]"
				@click="executeAvatar()"
			/>
			<vinput v-model="load.name" placeholder="昵称" :input="{ required: 'true' }" />
			<vinput v-model="load.email" placeholder="邮箱(可自动获取信息)" :input="{ required: 'true' }" @input="handleEmailInput" />
			<vinput v-model="load.site" placeholder="http(s)://主页" />
		</div>

		<button
			w="full"
			py="1em"
			mt="1em"
			grid="col-span-full"
			bg="transparent"
			transition="all"
			border="1px solid [var(--border-color7)] hover:[var(--primary-color)]"
			text="[var(--text-color)] hover:[var(--primary-color)]"
			font-size="inherit"
			cursor="pointer"
			formaction="true"
		>
			发送
		</button>

		<!-- <p text="[var(--error-color)]">{{ (error as any)?.data?.message || error?.message }}</p> -->
		<typewriter
			:style="{
				color: error ? 'var(--error-color)' : 'var(--text-color)',
			}"
			py=".5em"
			:content="(error as any)?.data?.message || error?.message "
		/>
	</form>
</template>
