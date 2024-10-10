//Camera
import { PerspectiveCamera } from "three"
import { sizes } from "../main.ts"

const FOV = 45

export function createCamera(): PerspectiveCamera {

  const camera = new PerspectiveCamera(
    FOV,
    sizes.width/sizes.height
  )
  camera.position.z = 6

  // window.addEventListener('resize',()=>{
  //   camera.aspect = sizes.width / sizes.height;
  //   camera.updateProjectionMatrix();
  // })

  return camera;
}

