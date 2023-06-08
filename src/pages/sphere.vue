<script setup lang="ts">
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import LogicMap from '~/composables/logic'

const three = ref()

const map = new LogicMap()
const gui = new GUI() // 创建 GUI 面板
gui.add(map.controller, 'rander').name('渲染')

onMounted(() => {
  map.initThree(three.value)

  const sphere = addSphere()
  setInterval(() => {
    sphere.rotateX(0.01)
    sphere.rotateY(0.01)
  }, 1000 / 60)
})

function addSphere() {
  const geometry = new SphereGeometry(1, 32, 32) // 创建几何体
  const material = new MeshBasicMaterial({ color: 0xFF0000 }) // 添加材质
  const sphere = new Mesh(geometry, material) // 创建网格
  sphere.position.set(2, 2, 0)
  map.scene.add(sphere)

  const group = gui.addFolder('球体')
  group.add(sphere.position, 'x', -3, 3, 0.01).name('X 轴')
  group.add({ scale: 0 }, 'scale', map.controller.scale)
    .name('Y 轴')
    .onChange((value: number) => sphere.position.setY(value))
  group.add({ direction: 'right' }, 'direction', map.controller.direction)
    .name('方向选择')
    .onChange((value: number) => sphere.position.setX(value))
  group.addColor({ color: 0xFF0000 }, 'color')
    .name('颜色')
    .onChange((value: number) => {
      // 更新球体颜色
      sphere.material.color.set(value)
    })

  return sphere
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
