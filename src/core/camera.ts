//Camera
import { PerspectiveCamera } from "three"

const FOV = 45
export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

export const camera = new PerspectiveCamera(
  FOV,
  sizes.width/sizes.height
)

camera.position.set(4,4,4)

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height =  window.innerHeight
	camera.aspect = sizes.width/ sizes.height
	camera.updateProjectionMatrix()
})

export default camera