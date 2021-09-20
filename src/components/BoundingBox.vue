<template>
  <div
    class="absolute border-1 border-blue-400"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
    @click="setActiveBox(index)"
    @mousedown.stop="startMoveBox"
    v-on="
      isEditing
        ? {
            mousemove: moveActiveBox,
            mouseup: stopMoveBox,
            mouseleave: stopMoveBox,
          }
        : {}
    "
  >
    <!-- Top Left -->
    <div v-if="isActive" class="circle top-0 left-0"></div>
    <!-- Top -->
    <div class="circle top-0 left-1/2"></div>
    <!-- Top Right -->
    <div class="circle top-0 left-full"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useBoundingBoxes, isEditing } from '~/composables/boundingBoxes'
import { Coordinate } from '~/types/Coordinate'
const props = defineProps({
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
  isActive: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  mouseX: {
    type: Number,
    required: true,
  },
  mouseY: {
    type: Number,
    required: true,
  },
})

const top = computed(() => props.topLeft.y)
const left = computed(() => props.topLeft.x)
const width = computed(() => props.topRight.x - props.topLeft.x)
const height = computed(() => props.bottomLeft.y - props.topLeft.y)

const elementX = ref(props.mouseX)
const elementY = ref(props.mouseY)

watch(
  () => props.mouseX,
  (val) => {
    elementX.value = val
  }
)
watch(
  () => props.mouseY,
  (val) => {
    elementY.value = val
  }
)
const { setActiveBox, startMoveBox, moveActiveBox, stopMoveBox } =
  useBoundingBoxes(elementX, elementY)
</script>

<style scoped>
.circle {
  @apply w-4 h-4 rounded-full bg-yellow-200 border-1 border-black absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer;
}
</style>
