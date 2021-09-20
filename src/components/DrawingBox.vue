<template>
  <div
    class="absolute border border-red-600"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  ></div>
</template>
<script setup lang="ts">
import { Coordinate } from '~/types/Coordinate'
import { PropType } from 'vue'

const props = defineProps({
  startingPoint: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
  topLeft: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
  topRight: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
  bottomLeft: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
  bottomRight: {
    type: Object as PropType<Coordinate>,
    required: true,
  },
})

const top = computed(() => props.topLeft.y)
const left = computed(() => props.topLeft.x)
const width = computed(() => props.topRight.x - props.topLeft.x)
const height = computed(() => props.bottomLeft.y - props.topLeft.y)
</script>

<style scoped></style>
