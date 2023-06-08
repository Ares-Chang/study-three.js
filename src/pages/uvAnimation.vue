<script setup lang="ts">
import { Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from 'three'
import LogicMap from '~/composables/logic'
import hero from '/public/hero.jpg'

const three = ref()

const map = new LogicMap()
map.camera.position.set(0, 2, 0)

onMounted(() => {
  map.initThree(three.value)

  addGraph()
})

function addGraph() {
  const geometry = new PlaneGeometry(2, 2) // 创建几何体

  // 纹理贴图加载器
  const texLoader = new TextureLoader()
  const texture = texLoader.load(hero) // .load() 方法加载图像，返回一个纹理对象 Texture
  const material = new MeshBasicMaterial({
    map: texture, // 设置纹理贴图
  })
  const cube = new Mesh(geometry, material) // 创建网格
  cube.rotateX(-Math.PI / 2) // 旋转网格，使平面朝上
  map.scene.add(cube)

  // 设置纹理映射模式
  texture.wrapS = RepeatWrapping // 对应 offste.x 偏移
  texture.wrapT = RepeatWrapping // 对应 offste.y 偏移
  setInterval(() => {
    texture.offset.x += 0.01
    texture.offset.y += 0.01
  }, 1000 / 60)
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
