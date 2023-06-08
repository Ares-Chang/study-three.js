<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import LogicMap from '~/composables/logic'

const three = ref()

const map = new LogicMap()
onMounted(() => {
  map.initThree(three.value)

  const cube = addBox()
  setInterval(() => {
    cube.rotateX(0.01)
    cube.rotateY(0.01)
  }, 1000 / 60)
})

function addBox() {
  const geometry = new BoxGeometry(1, 1, 1) // 创建几何体
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
    wireframe: true, // 显示线条模式
  }) // 添加材质
  const cube = new Mesh(geometry, material) // 创建网格
  map.scene.add(cube)

  const gui = map.gui.addFolder('几何体')
  gui.add(cube.position, 'x', -3, 3, 0.01).name('X 轴')
  gui.add({ scale: 0 }, 'scale', map.controller.scale)
    .name('Y 轴')
    .onChange((value: number) => cube.position.setY(value))
  gui.add({ direction: 'center' }, 'direction', map.controller.direction)
    .name('方向选择')
    .onChange((value: number) => cube.position.setX(value))
  gui.addColor({ color: 0x00FF00 }, 'color')
    .name('颜色')
    .onChange((value: number) => {
      // 更新球体颜色
      cube.material.color.set(value)
    })

  return cube
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
