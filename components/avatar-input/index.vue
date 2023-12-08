<script setup lang="ts">
import { saveAs } from "@wsvaio/utils";
import IAvatar from "@/assets/img/avatar.png";

const user = useUserStore();
let modelValue = $(defineModel<string>());

const { data: avatar, execute: executeAvatar } = $(
	useLazyFetch<{ content: string }>("/api/common/pp", {
		onResponse(data) {
			if (data.response.status == 200) modelValue = avatar?.content || "";
		},
		immediate: false,
	})
);
</script>

<template>
	<div class="avatar-input">
		<img
			:src="modelValue"
			h="96px"
			w="96px"
			grid="row-span-full"
			alt="头像"
			@error="(modelValue = IAvatar), executeAvatar()"
		/>
		<div class="control">
			<button class="i-material-symbols-light-download" title="下载" @click.prevent="modelValue && saveAs(modelValue)" />
			<button class="i-material-symbols-light-sync" title="刷新" @click.prevent="executeAvatar()" />
			<button class="i-material-symbols-light-reset-image" title="重置" @click.prevent="user.refreshAvatar()" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.avatar-input {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid var(--border-color7);

  & > .control {
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    // inset: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    opacity: 0;
    background-color: var(--bg-color);
    pointer-events: none;

    & > button {
			transition: all .3s;
      font-size: 20px;
      cursor: pointer;

			&:hover {
				color: var(--primary-color)
			}
    }
  }

  &:hover {
    border-color: var(--primary-color);

    & > .control {
      opacity: 1;
      pointer-events: all;

    }
  }
}
</style>
