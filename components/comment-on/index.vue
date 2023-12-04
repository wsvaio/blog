<script setup lang="ts">
const modelValue = $ref("");
</script>

<template>
	<div class="card comment-on">
		<div pos="relative" class="textarea">
			<textarea id="comment-on-textarea" v-model="modelValue" placeholder="遇见你真好~" rows="10" />
			<label for="comment-on-textarea" :class="[modelValue && 'active']">遇见你真好~</label>
		</div>
	</div>
</template>

<style lang="less" scoped>
.comment-on {
  .textarea {
    textarea {
      @apply font-sans;

      box-sizing: border-box;
      width: 100%;
      padding: 1em;
      overflow: visible;
      outline: none;
      background: url("https://misakamoe.com/image") no-repeat right bottom / contain;
      color: var(--text-color);
      font-size: 16px;
      resize: vertical;

      &:placeholder-shown::placeholder {
        color: transparent;
      }

      &:focus {
        border-color: var(--primary-color);
      }
    }

    label {
      position: absolute;
      top: 1em;
      left: 1em;
      transform: translateY(0%);
      transition: all 0.2s;
      border-radius: 0.2em;
    }

    textarea:focus ~ label,
    label.active {
      top: 0;
      left: 1em;
      padding: 0.25em;
      transform: translateY(-50%);
      background-color: var(--primary-color);
      color: white;
      font-size: 0.75em;
    }
  }
}
</style>
