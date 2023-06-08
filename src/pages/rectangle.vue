<script setup lang="ts">
import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial } from 'three'
import LogicMap from '~/composables/logic'

const three = ref()

const map = new LogicMap()
onMounted(() => {
  map.initThree(three.value)
  addRectangle()
})

function addRectangle() {
  const geometry = new BufferGeometry()
  const vertices = new Float32Array([
    0, 0, 0, // 顶点 1 坐标
    80, 0, 0, // 顶点 2 坐标
    80, 80, 0, // 顶点 3 坐标

    0, 0, 0, // 顶点 4 坐标
    80, 80, 0, // 顶点 5 坐标
    0, 80, 0, // 顶点 6 坐标
  ])

  const attribue = new BufferAttribute(vertices, 3)
  geometry.attributes.position = attribue

  const material = new MeshBasicMaterial({
    color: 0x00FF00,
    side: DoubleSide, // 双面可见，默认反面可见
  })

  const mesh = new Mesh(geometry, material)
  map.scene.add(mesh)
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
