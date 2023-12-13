<script setup lang="ts">
import { pick } from "@wsvaio/utils";

const { articleId, commentId } = defineProps<{
	articleId: number;
	commentId?: number;
}>();

const emit = defineEmits<{
	submit: [];
}>();

const user = useUserStore();

const form = reactive({
	content: "",
	whispers: false,
	notARobot: false,
});

let init = false;
const { execute, error, pending } = useAsyncData(async () => {
	if (init == false) return (init = true);
	let result = commentId
		? await $fetch(`/api/comment/${commentId}/comment`, {
			method: "POST",
			body: {
				...pick(user, ["avatar", "acceptEmails", "email", "name", "site"]),
				...form,
				articleId,
			},
		})
		: await $fetch(`/api/article/${articleId}/comment`, {
			method: "POST",
			body: {
				...pick(user, ["avatar", "acceptEmails", "email", "name", "site"]),
				...form,
			},
		});

	emit("submit");
	form.content = "";
	form.notARobot = false;

	return result;
});

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

		<vtextarea v-model="form.content" placeholder="多想聆听你的声音" :textarea="{ required: 'true' }" />
		<!-- <markdown-editor v-model="content" /> -->

		<div grid="~ cols-[max-content_1fr_1fr] rows-3" gap="1em" mt="1em">
			<avatar-input
				v-model="user.avatar" h="96px" w="96px" grid="row-span-2"
				:img="{ alt: '头像' }"
			/>
			<vinput
				v-model="user.email"
				placeholder="邮箱(可获取上次登录信息)"
				:input="{ required: 'true', type: 'email' }"
				grid="col-span-2"
				@input="handleEmailInput"
			/>

			<vinput v-model="user.name" placeholder="昵称" :input="{ required: 'true' }" />

			<vinput v-model="user.site" placeholder="http(s)://主页" />

			<div grid="col-span-full" flex="~" items="center">
				<label title="保留信息到浏览器缓存，方便下次评论">
					<input v-model="user.persist" type="checkbox" />
					<span>保留信息</span>
				</label>

				<label title="如果有人回复你，将会邮件通知">
					<input v-model="user.acceptEmails" type="checkbox" />
					<span>接收邮件</span>
				</label>

				<label title="只会发送邮件，不会保存数据，也不会展示">
					<input v-model="form.whispers" type="checkbox" />
					<span>悄悄话</span>
				</label>

				<label title="你们都是机器人吗？[dog]">
					<input v-model="form.notARobot" required type="checkbox" />
					<span>我不是机器人</span>
				</label>

				<awesome-button ml="auto" h="full" w="7em" :disabled="pending">
					<div flex="~" items="center">
						<template v-if="pending">
							<div class="i-eos-icons-loading" text="16px" mr=".5em" />
							<span>发送中</span>
						</template>
						<span v-else>发 送</span>
					</div>
				</awesome-button>
			</div>
		</div>

		<p text="[var(--error-color)]">{{ (error as any)?.data?.message || error?.message }}</p>
		<!-- <typewriter
			:style="{
				color: error ? 'var(--error-color)' : 'var(--text-color)',
			}"
			py=".5em"
			:content="(error as any)?.data?.message || error?.message "
		/> -->
	</form>
</template>
