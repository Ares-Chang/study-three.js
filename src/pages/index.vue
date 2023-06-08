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
    name: '自定义面',
    path: '/rectangle',
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
