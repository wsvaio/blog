<template>
  <span class="copyright">
    xxxx 提供技术支持
    <el-tooltip placement="top" effect="light">
      <template #content>
        xxxx
      </template>
      <el-link href="#">联系我们</el-link>
    </el-tooltip>
    Copyright@2016-2022 xxxx 版权所有
    <el-link target="__blank" href="">浙ICP备xxxx号-1</el-link>
    <el-link target="__blank"
    href="">
      浙公网安备 xxxx号
    </el-link>
  </span>
</template>

<style lang="less" scoped>
.copyright {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);

  .el-link {
    vertical-align: baseline;

  }

}
</style>