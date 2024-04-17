<script setup lang="ts">
// const link = location.href;
const isMounted = $(useMounted());
const link = computed(() => {
  if (!isMounted)
    return "/";
  else return location.origin + location.pathname;
});
const message = useMessage();
function copy(text: string) {
  navigator.clipboard.writeText(text);
  message.show("复制成功");
}
</script>

<template>
  <div class="article-copyright">
    <p>本文作者：<a href="mailto:wsvaio@qq.com">wsvaio</a></p>
    <p>
      文章链接：
      <a href="#" @click.prevent="copy(link)">{{ link }}</a>
    </p>
    <p>
      版权声明：本博客所有文章除特别声明外，均采用MIT许可协议。转载请注明来自
      <a href="#" @click.prevent="copy(`<a href='https://wsvaio.site'>WSの小屋</a>`)">WSの小屋</a>
    </p>
    <!-- <p>
			<a :href="`https://connect.qq.com/widget/shareqq/index.html?url=${link}`" target="_blank">
				QQ
			</a>
			<a :href="`https://service.weibo.com/share/share.php?url=${link}`" target="_blank">Weibo</a>
		</p> -->
  </div>
</template>

<style lang="less" scoped></style>
