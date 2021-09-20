import { ref, Ref } from 'vue'
import { Coordinate } from '~/types/Coordinate'
import { useBoundingBoxes } from './boundingBoxes'
// import { createNewBox } from './boundingBoxes'

const { createNewBox } = useBoundingBoxes()
const getLowest = (a: number, b: number) => {
  if (a <= b) return a
  return b
}
const getHighest = (a: number, b: number) => {
  if (a >= b) return a
  return b
}
const getVerticesFromPoints = (
  startingPoint: Coordinate,
  endingPoint: Coordinate
) => {
  const topLeft = {
    x: getLowest(startingPoint.x, endingPoint.x),
    y: getLowest(startingPoint.y, endingPoint.y),
  }
  const topRight = {
    x: getHighest(startingPoint.x, endingPoint.x),
    y: getLowest(startingPoint.y, endingPoint.y),
  }
  const bottomLeft = {
    x: getLowest(startingPoint.x, endingPoint.x),
    y: getHighest(startingPoint.y, endingPoint.y),
  }
  const bottomRight = {
    x: getHighest(startingPoint.x, endingPoint.x),
    y: getHighest(startingPoint.y, endingPoint.y),
  }
  return { topLeft, topRight, bottomLeft, bottomRight }
}
export class DrawingBox {
  topLeft: Coordinate
  topRight: Coordinate
  bottomLeft: Coordinate
  bottomRight: Coordinate
  startingPoint: Coordinate
  constructor(
    startingPoint: Coordinate = { x: 0, y: 0 },
    endingPoint: Coordinate = { x: 10, y: 10 }
  ) {
    this.startingPoint = startingPoint
    const vertices = getVerticesFromPoints(startingPoint, endingPoint)
    this.topLeft = vertices.topLeft
    this.topRight = vertices.topRight
    this.bottomLeft = vertices.bottomLeft
    this.bottomRight = vertices.bottomRight
  }
}
export const currentDrawingBox = ref<DrawingBox>(new DrawingBox())
export const isDrawingNewBox = ref(false)
const draw = (x: number, y: number) => {
  const vertices = getVerticesFromPoints(
    currentDrawingBox.value.startingPoint,
    { x, y }
  )
  currentDrawingBox.value = { ...currentDrawingBox.value, ...vertices }
}
export const useDrawingBox = (
  elementX?: Ref<number>,
  elementY?: Ref<number>
) => {
  return {
    currentBox: ref(null),
    startDrawing: () => {
      isDrawingNewBox.value = true
      currentDrawingBox.value.startingPoint.x = elementX?.value || 0
      currentDrawingBox.value.startingPoint.y = elementY?.value || 0
    },
    handleDrawing: () => {
      if (isDrawingNewBox.value && elementX && elementY) {
        draw(elementX.value, elementY.value)
      }
    },
    stopDrawing: () => {
      // Gotta stop drawing and save the current box as a new bounding box
      createNewBox(currentDrawingBox.value)
      isDrawingNewBox.value = false
    },
    getBox: (startingPoint: Coordinate, endingPoint: Coordinate) => {
      const topLeft = {
        x: startingPoint.x < endingPoint.x ? startingPoint.x : endingPoint.x,
        y: startingPoint.y < endingPoint.y ? startingPoint.y : endingPoint.y,
      }
      const bottomRight = {
        x: startingPoint.x > endingPoint.x ? startingPoint.x : endingPoint.x,
        y: startingPoint.y > endingPoint.y ? startingPoint.y : endingPoint.y,
      }
      const width = bottomRight.x - topLeft.x
      const height = bottomRight.y - topLeft.y
      return { top: topLeft.y, left: topLeft.x, width, height }
    },
  }
}
