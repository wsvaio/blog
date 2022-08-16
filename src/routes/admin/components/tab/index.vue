<script lang="ts" setup>


const { keepAlive } = $(mainStore());


function dragstart(event: DragEvent) {
  const el: T = event.target;
  event.dataTransfer?.setData("dragIndex", el.dataset.index);
}
function drop(event: DragEvent, dropIndex: number) {
  const dragIndex: T = event.dataTransfer?.getData("dragIndex");

  let temp = keepAlive[dragIndex];

  keepAlive.splice(dragIndex, 1);
  keepAlive.splice(dropIndex, 0, temp);

}

</script>

<template tag="div" class="tab">

  <transition-group>
    <el-tag v-for="(item, index) in keepAlive" :key="item.name || item.path"
    :data-index="index" draggable="true" @dragstart="dragstart" @drop="drop($event, index)" @dragover.prevent=""
    cursor="pointer" @click="$router.push(item)"
    :type="$route.matched.find(route => route.name == item.name) ? '' : 'info'"
    :closable="keepAlive.length > 1"
    :effect="item.name == $route.name ? 'dark' : 'plain'"
    @close="keepAlive.splice(index, 1), (item.name == $route.name) && $router.push([...keepAlive].reverse()[0])">{{ item.meta?.title || item.name }}</el-tag>
  </transition-group>





</template>

<style lang="less" scoped>
.tab {
  background: #fff;
  padding: 0 15px 5px;
  font-size: 0;
  border-bottom: 1px solid rgb(243, 246, 248);
  position: sticky;
  z-index: 10;
  top: 56px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
}

:deep(.el-tag__close) {
  vertical-align: middle;
}

.el-tag {
  transition: all 0.333s ease;
  margin-right: 5px;
  margin: 5px 5px 0 0;
  border-radius: 0px;
  user-select: none;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-active {
  position: absolute;
}
</style>