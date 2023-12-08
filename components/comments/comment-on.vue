<script setup lang="ts">
const { articleId, commentId } = defineProps<{
	articleId: number;
	commentId?: number;
}>();

const emit = defineEmits<{
	submit: [];
}>();

const user = useUserStore();
let content = $ref("");

const { execute, error, pending, data } = useAsyncData(
	async () => {
		let result = commentId
			? await $fetch(`/api/comment/${commentId}/comment`, {
				method: "POST",
				body: {
					...user,
					content,
				},
			})
			: await $fetch(`/api/article/${articleId}/comment`, {
				method: "POST",
				body: {
					...user,
					content,
				},
			});

		emit("submit");
		content = "";

		return result;
	},
	{
		immediate: false,
	}
);

const handleEmailInput = useDebounceFn(user.refresh, 200);
</script>

<template>
	<form class="comment-on" @submit.prevent="execute()">
		<div flex="~" items="center" font-italic my=".5em">
			<nuxt-link to="https://www.baidu.com/s?wd=markdown" un-text="inherit" mr=".5em">
				<div text="14px" class="i-cib-markdown" />
			</nuxt-link>
			<span>Markdown Supported while</span>
			<div mx=".5em" class="i-bi-code-slash" text="14px" />
			<span>Forbidden</span>
		</div>

		<vtextarea v-model="content" placeholder="见到你很高兴！" :textarea="{ required: 'true' }" />
		<!-- <markdown-editor v-model="content" /> -->

		<div grid="~ cols-[max-content_1fr_1fr_max-content] rows-2" gap="1em" mt="1em">
			<avatar-input
				v-model="user.avatar" h="96px" w="96px" grid="row-span-full"
				:img="{ alt: '头像' }"
			/>
			<vinput
				v-model="user.email"
				placeholder="邮箱(可获取上次登录信息)"
				:input="{ required: 'true', type: 'email' }"
				grid="col-span-3"
				@input="handleEmailInput"
			/>

			<vinput v-model="user.name" placeholder="昵称" :input="{ required: 'true' }" />

			<vinput v-model="user.site" placeholder="http(s)://主页" />

			<awesome-button
				flex="~" justify="center" items="center" :disabled="pending && data"
				w="5em"
			>
				<template v-if="pending && data">
					<div class="i-eos-icons-loading" />
					发送中
				</template>
				<template v-else>发送</template>
			</awesome-button>
		</div>

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
