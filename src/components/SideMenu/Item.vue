<template>
  <!-- hidden 选项存在则不显示 -->
  <li v-if="!model.hidden">
    <div @click="toggle">
      <!-- 图标 -->
      <Icon v-if="model.meta && model.meta.icon" :icon-class="model.meta.icon"></Icon>
      <!-- 标题 -->
      <span v-if="isFolder">
        <!-- 如果是父节点 -->
        <span v-if="model.meta && model.meta.title">
          {{ model.meta.title }}
        </span>
        <span>{{ open ? '-' : '+' }}</span>
      </span>
      <template v-else>
        <!-- 如果是叶子节点，渲染链接 -->
        <router-link v-if="model.meta && model.meta.title" :to="resolvePath(model.path)">
          {{ model.meta.title }}
        </router-link>
      </template>
    </div>

    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <Item
        class="item"
        v-for="route in model.children"
        :key="route.path"
        :model="route"
        :base-path="resolvePath(model.path)"
      ></Item>
    </ul>
  </li>
</template>

<script>
import path from 'path'

export default {
  name: 'Item',
  props: {
    model: Object,
    basePath: {
      tpye: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    // 判断是否有子树
    isFolder: function() {
      return this.model.children && this.model.children.length
    },
  },
  methods: {
    // 考虑跨平台，拼接父 path 和子 path 为完整 path
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
  },
}
</script>

<style></style>
