<script setup lang="ts">
import { saveAs } from "@wsvaio/utils";

const user = useUserStore();
let modelValue = $(defineModel<string>());

const { execute: executeAvatar, status } = $(
  useLazyFetch<{ content: string }>("/api/common/pp", {
    onResponse(data) {
      if (data.response.status == 200)
        modelValue = data.response._data?.content || "";
    },
    immediate: false,
    // server: false,
  })
);
</script>

<template>
  <div class="avatar-input">
    <client-only>
      <img
        :src="modelValue || '/error'"
        h="96px"
        w="96px"
        grid="row-span-full"
        alt="头像"
        @error="executeAvatar()"
      />
    </client-only>

    <loading :show="status == 'pending'" />
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
