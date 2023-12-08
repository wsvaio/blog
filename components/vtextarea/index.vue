<script setup lang="ts">
import type { ReservedProps, TextareaHTMLAttributes } from "vue";

defineProps<{
	placeholder?: string;
	textarea?: TextareaHTMLAttributes & ReservedProps;
}>();
const modelValue = defineModel<string>();
</script>

<template>
	<div class="vtextarea">
		<textarea
			v-model="modelValue" :placeholder="placeholder" rows="10"
			:="textarea"
		/>
		<label :class="[modelValue && 'active']">{{ placeholder }}</label>

		<popup pos="!absolute" left="0" bottom="0" p=".5em">
			<template #popuper>
				<ul
					grid="~ cols-[repeat(12,1fr)]" m="0" p=".5em"
					gap=".25em"
					class="card"
					list="none" bg="[var(--bg-color)]"
				>
					<li v-for="item in emojis" cursor="pointer" @click="modelValue += item">{{ item }}</li>
				</ul>
			</template>
			<div class="i-solar-expressionless-square-bold-duotone" />
		</popup>
	</div>
</template>

<style lang="less" scoped>
.vtextarea {
  position: relative;

  textarea {
    @apply font-sans;

    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    overflow: visible;
    transition: all .3s;
    border: 1px solid var(--border-color7);
    outline: none;
    // background: url("https://misakamoe.com/image") no-repeat right bottom / contain;
    background: url("@/assets/img/textarea1.webp") no-repeat right bottom / contain;
    color: var(--text-color);
    color: inherit;
    font-size: inherit;
    resize: vertical;

    &:placeholder-shown::placeholder {
      color: transparent;
    }

    &:focus {
      border-color: var(--primary-color);
    }

    &:hover {
    border-color: var(--primary-color);
  }
  }

  label {
    position: absolute;
    top: 1em;
    left: 1em;
    transform: translateY(0%);
    transition: all 0.2s;
    color: var(--text-color1);
    pointer-events: none;
  }

  textarea:focus ~ label,
  label.active {
    top: 0;
    left: 1em;
    padding: 0.25em;
    transform: translateY(-50%);
    border-radius: 0.2em;
    background-color: var(--primary-color);
    color: white;
    font-size: small;
  }

}
</style>
