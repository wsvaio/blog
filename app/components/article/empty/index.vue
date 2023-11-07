<script setup lang="ts">

</script>

<template>
  <div class="card empty-article" flex="~ col items-center" text="center">
    <div class="empty-article__icon" i-fluent-emoji-flat-open-book />
    <h2 class="empty-article__title">这里还没有文章</h2>
    <p class="empty-article__desc">这个分类暂时空空如也，先去看看其他有趣的内容吧。</p>
    <!-- <NuxtLink to="/" class="empty-article__link">
      回到首页
    </NuxtLink> -->
  </div>
</template>

<style lang="less" scoped>
.empty-article {
  // width: min(100%, 680px);
  // margin: 24px auto 40px;
  padding: 56px 28px;
  // border: 1px solid rgba(255, 255, 255, 0.24);
  // border-radius: 20px;
  // background:
  //   radial-gradient(circle at 20% 18%, rgba(255, 139, 196, 0.18), transparent 32%),
  //   radial-gradient(circle at 80% 10%, rgba(112, 208, 255, 0.16), transparent 30%),
  // rgba(255, 255, 255, 0.08);
  // box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  // backdrop-filter: blur(8px);
}

.empty-article__icon {
  width: 76px;
  height: 76px;
  margin-bottom: 18px;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18));
}

.empty-article__title {
  margin: 0 0 10px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.24);
}

.empty-article__desc {
  max-width: 420px;
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.empty-article__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  border-radius: 999px;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(120deg, #ff8bc4, #7cc7ff, #a2ef8a);
  box-shadow: 0 10px 24px rgba(255, 139, 196, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.empty-article__link:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(124, 199, 255, 0.3);
}
</style>
