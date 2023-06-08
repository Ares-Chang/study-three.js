<script setup lang="ts">
const list = [
  {
    name: '几何体',
    path: '/box',
  },
  {
    name: '球体',
    path: '/sphere',
  },
  {
    name: '点',
    path: '/point',
  },
  {
    name: '线条',
    path: '/line',
  },
  {
    name: '阵列几何体',
    path: '/arrayBox',
  },
  {
    name: '自定义面',
    path: '/rectangle',
  },
  {
    name: '贴图几何体',
    path: '/textureBox',
  },
  {
    name: '透明贴图',
    path: '/transparencyTextureBox',
  },
  {
    name: 'UV 动画',
    path: '/uvAnimation',
  },
]
</script>

<template>
  <div h-screen flex items-center justify-center gap-2>
    <div v-for="item in list" :key="item.name" btn>
      <a :href="item.path">{{ item.name }}</a>
    </div>
  </div>
</template>
