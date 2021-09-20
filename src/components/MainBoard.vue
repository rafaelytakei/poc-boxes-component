<template>
  <div
    ref="board"
    class="w-128 relative"
    @mousedown.prevent="startDrawing"
    @mousemove="handleDrawing"
    @mouseup="stopAll"
    @mouseleave="stopAll"
  >
    <img :src="image" />
    <drawing-box
      v-if="isDrawingNewBox"
      :starting-point="currentDrawingBox.startingPoint"
      :top-left="currentDrawingBox.topLeft"
      :top-right="currentDrawingBox.topRight"
      :bottom-left="currentDrawingBox.bottomLeft"
      :bottom-right="currentDrawingBox.bottomRight"
    />
    <bounding-box
      v-for="(box, i) in allBoundingBoxes"
      :top-left="box.topLeft"
      :top-right="box.topRight"
      :bottom-left="box.bottomLeft"
      :bottom-right="box.bottomRight"
      :is-active="box.isActive"
      :index="i"
      :mouse-x="elementX"
      :mouse-y="elementY"
    />
  </div>
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { allBoundingBoxes } from '~/composables/boundingBoxes'
import {
  currentDrawingBox,
  useDrawingBox,
  isDrawingNewBox,
} from '~/composables/drawingBox'

defineProps({
  image: {
    type: String,
    default: '',
  },
})

const board = ref(null)
const { elementX, elementY } = useMouseInElement(board)
const { startDrawing, stopDrawing, handleDrawing } = useDrawingBox(
  elementX,
  elementY
)

const stopAll = () => {
  // User has to:
  // 1 - Stop drawing a nex box
  // 2 - Stop editing any box, but the box keeps active
  if (isDrawingNewBox.value) {
    stopDrawing()
  }
}

const handleMouseDown = () => {
  // Two scenarios:
  // 1 - User clicks an existing box (in this case, the box goes active and the user starts editing it)
  // 2 - User clicks on the image (not on any box inside it)
  // Scenario 2
}
const handleMouseMove = () => {
  // Two scenarios:
  // 1 - User is editing a bounding box
  // 2 - User isn't editing a bounding box (in this case, he starts drawing a new box)
  // ---------------------------
  // Scenario 1
  // TODO
  // Scenario 2
  if (!editingBox.value) {
  }
}
</script>

<style scoped></style>
