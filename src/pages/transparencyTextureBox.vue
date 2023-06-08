<script setup lang="ts">
import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three'
import LogicMap from '~/composables/logic'
import star from '/public/fivePointedStar.png'

const three = ref()

const map = new LogicMap()
map.camera.position.set(0, 2, 0)

onMounted(() => {
  map.initThree(three.value)
  addBox()
})

function addBox() {
  const geometry = new PlaneGeometry(2, 2) // 创建几何体

  // 纹理贴图加载器
  const texLoader = new TextureLoader()
  const texture = texLoader.load(star) // .load() 方法加载图像，返回一个纹理对象 Texture
  const material = new MeshBasicMaterial({
    map: texture, // 设置纹理贴图
    transparent: true, // 设置透明
  })
  const cube = new Mesh(geometry, material) // 创建网格
  map.scene.add(cube)

  cube.rotateX(-Math.PI / 2)

  return cube
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
