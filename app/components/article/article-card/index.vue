<script setup lang="ts">
import defaultImage from "@/assets/img/occupy.jpg?url";
import { createMarkdownExit } from "markdown-exit";
const { data = {}, type = "left" } = defineProps<{
  data: Record<any, any>;
  type: "left" | "right" | "full";
}>();

const isError = ref(false);
const wallpaper = useWallpaper();

const imgUrl = computed(() => {
  if (isError.value) return defaultImage;
  return wallpaper.randomImageUrl(data.id);
});

const md = createMarkdownExit();
const isMounted = $(useMounted());


let textContent = $ref("");

watchEffect(async () => {
  if (!isMounted) return;
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(md.render(data.content), "text/html");
  textContent = [...doc.querySelectorAll("*")]
    .map(item => item.textContent)
    .join(" ")
    .trim();
});
</script>

<template>
  <div class="article-card" grid="~ rows-1" pos="relative" overflow="hidden" bg="black" rounded="1.5" :class="[type]">
    <img class="bgimage" :src="imgUrl" pos="absolute" inset="0" scale="[1.55]" object="cover" h="full" loading="lazy" />

    <div class="image">
      <img :src="imgUrl" loading="lazy" object="cover" h="full" z="10" aspect-ratio="square" @error="isError = true" />
    </div>
    <div color="white" py="48px" px="32px" z="1" flex="~ col">
      <ul m="0" p="0" list="none" flex="~" gap=".5em" text="14px">
        <li flex="~" gap=".5em" items="center">
          <small rounded="full" bg="[var(--primary-color)]" p=".12em">
            <div class="i-ic:round-edit-calendar" />
          </small>
          <span>{{ dateFormat(data.updated_at) }}</span>
        </li>

        <li flex="~" gap=".5em" items="center" ml="auto">
          <small rounded="full" bg="[var(--error-color)]" p=".12em">
            <div class="i-material-symbols:category-outline" />
          </small>
          <span>{{ data.type.name }}</span>
        </li>

        <li flex="~" gap=".5em" items="center">
          <small rounded="full" bg="[var(--success-color)]" p=".12em">
            <div class="i-pepicons-pop:label" />
          </small>

          <span>{{data?.tags?.map((item: any) => item.name).join(" · ")}}</span>
        </li>
      </ul>

      <h2 z="10" font="normal">
        <nuxt-link :to="`/article/${data.id}`" hover="text-[var(--primary-color)]" underline="transparent"
          color="inherit">
          {{ data.title }}
        </nuxt-link>
      </h2>

      <p v-if="textContent" indent="2em" lh="[1.5]" mt="0">
        {{ textContent.length > 64 ? `${textContent.slice(0, 64)}……` : textContent }}
      </p>

      <ul mt="auto" m="0" p="0" list="none" flex="~" gap=".5em" text="14px">
        <li>
          {{ dateFormat(data.created_at) }}
        </li>
        <li>|</li>
        <li>{{ data.reads }} 阅读</li>
        <li>|</li>
        <li>{{ data._count?.comment }} 评论</li>
        <li>|</li>
        <li>{{ data.content.length }} 字数</li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.article-card {
  @media (width >=768px) {
    &>.image>img {
      transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
    }

    &>.bgimage {
      filter: blur(1.875rem) brightness(0.75);
    }

    &:hover>.image>img {
      transform: scale(1.05) rotate(1deg);
    }

    &.left {
      grid-template-columns: 1fr 2fr;

      &>.image {
        clip-path: polygon(0 0, 100% 0, 94% 100%, 0 100%);
      }
    }

    &.right {
      grid-template-columns: 2fr 1fr;

      &>.image {
        clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%);
        order: 10;
      }
    }
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;

    &>.image {
      display: none;
    }

    &>.bgimage {
      transform: scale(1);
      filter: none;
    }
  }

  img {
    display: block;
    width: 100%;
  }
}
</style>
