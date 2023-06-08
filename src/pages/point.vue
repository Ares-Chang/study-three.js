<script setup lang="ts">
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three'
import LogicMap from '~/composables/logic'

const three = ref()

const map = new LogicMap()
onMounted(() => {
  map.initThree(three.value)
  addPoint()
})

function addPoint() {
  const geometry = new BufferGeometry()
  // 类型化数组创建顶点数据
  const vertices = new Float32Array([
    0, 0, 0, // 顶点 1 坐标
    5, 0, 0, // 顶点 2 坐标
    0, 10, 0, // 顶点 3 坐标
    0, 0, 1, // 顶点 4 坐标
    0, 0, 10, // 顶点 5 坐标
    5, 0, 1, // 顶点 6 坐标
  ])
  // 创建属性缓冲区对象
  const attribue = new BufferAttribute(vertices, 3)
  // 设置几何体 attributes 属性的位置属性
  geometry.attributes.position = attribue
  const material = new PointsMaterial({
    color: 0xFFFF00,
    size: 0.3, // 点对象像素尺寸
  })
  const points = new Points(geometry, material) // 点模型对象

  map.scene.add(points)
  return points
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
