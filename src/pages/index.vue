<script setup lang="ts">
import LogicMap from '~/composables/logic'

const map = ref()

onMounted(() => {
  const logic = new LogicMap()
  logic.initThree(map.value)
})
</script>

<template>
  <div ref="map" h-screen w-screen overflow-hidden />
</template>
