<script setup lang="ts">
const {
  content = "",
  printSpeed = 100,
  deleteSpeed = 50,
} = defineProps<{
  content?: string;
  printSpeed?: number;
  deleteSpeed?: number;
}>();

const emit = defineEmits(["finish"]);

let oldContent = $ref("");
let count = $ref(0);
watch(
  () => content,
  (_, oldValue) => {
    oldContent = oldValue;
    count++;
  }
);

const same = $computed(() => {
  for (let i = content.length - 1; i >= 0; i--) {
    if (oldContent.startsWith(content.slice(0, i)))
      return content.slice(0, i);
  }
  return "";
});

const unContent = $computed(() => content.slice(same.length));
const unOldContent = $computed(() => oldContent.slice(same.length));

let timer: NodeJS.Timeout;

watch(
  () => content,
  () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      emit("finish");
    }, unContent.length * printSpeed + unOldContent.length * deleteSpeed);
  },
  { immediate: true }
);
</script>

<template>
  <ul
    m="0" p="0" list="none" flex="~ wrap"
    class="typewriter"
  >
    <li v-for="item in same">{{ item }}</li>
    <li
      v-for="(item, index) in unOldContent"
      :key="count + item + index"
      :style="{
        animation: `hide ${unOldContent.length * deleteSpeed - index * deleteSpeed}ms steps(1) both`,
      }"
    >
      {{ item }}
    </li>

    <li
      v-for="(item, index) in unContent"
      :key="count + item + index"
      :style="{
        animation: `show ${(index + 1) * printSpeed + unOldContent.length * deleteSpeed}ms steps(1) both`,
      }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style lang="less">
ul.typewriter {
  @keyframes show {
    0% {
      width: 0;
      opacity: 0;
    }

    100% {
      width: 1em;
      opacity: 1;
    }
  }

  @keyframes hide {
    0% {
      width: 1em;
      opacity: 1;
    }

    100% {
      width: 0;
      opacity: 0;
    }
  }
}
</style>
