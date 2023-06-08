<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import LogicMap from '~/composables/logic'

const three = ref()

const map = new LogicMap()
onMounted(() => {
  map.initThree(three.value)
  map.camera.position.set(10, 10, 30)

  new Array(10).fill(null).forEach((_, x) => {
    new Array(10).fill(null).forEach((_, z) => {
      addBox(x * 2, 0, z * 2)
    })
  })
})

function addBox(x = 0, y = 0, z = 0) {
  const geometry = new BoxGeometry(1, 1, 1) // 创建几何体
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
    wireframe: true, // 显示线条模式
  }) // 添加材质
  const cube = new Mesh(geometry, material) // 创建网格
  cube.position.set(x, y, z)

  map.scene.add(cube)

  return cube
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
