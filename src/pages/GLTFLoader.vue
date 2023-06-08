<script setup lang="ts">
import { DirectionalLight } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import LogicMap from '~/composables/logic'
import car from '/public/car.glb'

const three = ref()

const map = new LogicMap()
map.camera.position.set(0, 2, 0)

onMounted(() => {
  map.initThree(three.value)

  addGraph()
})

function addGraph() {
  const loader = new GLTFLoader()

  // loader.load('https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb', (gltf) => {
  loader.load(car, (gltf) => {
    console.log('控制台查看加载gltf文件返回的对象结构', gltf)
    console.log('gltf对象场景属性', gltf.scene)
    // 返回的场景对象gltf.scene插入到threejs场景中
    map.scene.add(gltf.scene)
    initLight(gltf.scene)
  })
}

function initLight(mesh: any) {
  const directionalLight = new DirectionalLight(0xFFFFFF, 1.0)
  directionalLight.position.set(80, 100, 50)
  directionalLight.target = mesh
  map.scene.add(directionalLight)
}
</script>

<template>
  <div ref="three" h-screen w-screen overflow-hidden />
</template>
