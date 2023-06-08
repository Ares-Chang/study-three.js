<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three'
import LogicMap from '~/composables/logic'
import hero from '/public/hero.jpg'

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

  // 纹理贴图加载器
  const texLoader = new TextureLoader()
  const texture = texLoader.load(hero) // .load() 方法加载图像，返回一个纹理对象 Texture
  const material = new MeshBasicMaterial({
    // color: 0xFF0000, // 设置颜色会与纹理贴图叠加
    map: texture, // 设置纹理贴图
  })
  const cube = new Mesh(geometry, material) // 创建网格
  map.scene.add(cube)

  return cube
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
