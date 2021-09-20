import { ref, Ref } from 'vue'
import { Coordinate } from '~/types/Coordinate'
import { DrawingBox } from './drawingBox'

class BoundingBox {
  topLeft: Coordinate
  topRight: Coordinate
  bottomLeft: Coordinate
  bottomRight: Coordinate
  isActive: boolean
  lastTopLeft: Coordinate
  lastTopRight: Coordinate
  lastBottomLeft: Coordinate
  lastBottomRight: Coordinate
  constructor(drawnBox: DrawingBox) {
    this.topLeft = drawnBox.topLeft
    this.topRight = drawnBox.topRight
    this.bottomLeft = drawnBox.bottomLeft
    this.bottomRight = drawnBox.bottomRight
    this.lastTopLeft = { x: 0, y: 0 }
    this.lastTopRight = { x: 0, y: 0 }
    this.lastBottomLeft = { x: 0, y: 0 }
    this.lastBottomRight = { x: 0, y: 0 }
    this.isActive = false
  }
}

export const isEditing = ref(false)
export const allBoundingBoxes = ref<Array<BoundingBox>>([])
const startingMoveMousePosition = ref<Coordinate>({ x: 0, y: 0 })
export const useBoundingBoxes = (
  elementX?: Ref<number>,
  elementY?: Ref<number>
) => {
  return {
    createNewBox: (drawnBox: DrawingBox) => {
      // Create a new bounding box, set all the other to inactive and active the latest
      const newBoundingBox = new BoundingBox(drawnBox)
      allBoundingBoxes.value.push(newBoundingBox)
      allBoundingBoxes.value.forEach((boundingBox, index) => {
        if (index === allBoundingBoxes.value.length - 1) {
          boundingBox.isActive = true
        } else {
          boundingBox.isActive = false
        }
      })
    },
    setActiveBox: (activeIndex: number) => {
      allBoundingBoxes.value.forEach((boundingBox, index) => {
        if (index === activeIndex) {
          boundingBox.isActive = true
        } else {
          boundingBox.isActive = false
        }
      })
    },
    startMoveBox: () => {
      console.log('starting')
      isEditing.value = true
      const activeBox = allBoundingBoxes.value.find((box) => box.isActive)
      console.log(allBoundingBoxes.value)
      console.log(activeBox)
      if (activeBox) {
        activeBox.lastBottomLeft = activeBox.bottomLeft
        activeBox.lastBottomRight = activeBox.bottomRight
        activeBox.lastTopLeft = activeBox.topLeft
        activeBox.lastTopRight = activeBox.topRight
      }
      startingMoveMousePosition.value.x = elementX?.value || 0
      startingMoveMousePosition.value.y = elementY?.value || 0
    },
    moveActiveBox: () => {
      // console.log(elementX?.value, startingMoveMousePosition.value.x)
      // The box has to move according to the user's mouse
      const activeBox = allBoundingBoxes.value.find((box) => box.isActive)
      // console.log(activeBox)
      if (activeBox) {
        const horizontalMovement =
          (elementX?.value || 0) - startingMoveMousePosition.value.x
        const verticalMovement =
          (elementY?.value || 0) - startingMoveMousePosition.value.y
        console.log(horizontalMovement)
        activeBox.topLeft.x = activeBox.lastTopLeft.x + horizontalMovement
        activeBox.topLeft.y = activeBox.lastTopLeft.y + verticalMovement
        activeBox.topRight.x = activeBox.lastTopRight.x + horizontalMovement
        activeBox.topRight.y = activeBox.lastTopRight.y + verticalMovement
        activeBox.bottomLeft.x = activeBox.lastBottomLeft.x + horizontalMovement
        activeBox.bottomLeft.y = activeBox.lastBottomLeft.y + verticalMovement
        activeBox.bottomRight.x =
          activeBox.lastBottomRight.x + horizontalMovement
        activeBox.bottomRight.y = activeBox.lastBottomRight.y + verticalMovement
      }
    },
    stopMoveBox: () => {
      isEditing.value = false
    },
  }
}
