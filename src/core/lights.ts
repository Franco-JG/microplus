import { AmbientLight, DirectionalLight } from "three"
//Lights
export const ambientLight = new AmbientLight(0xffffff, 0.5)

export const directionalLight = new DirectionalLight(0xffffff,2)

export const directionalLight2 =  new DirectionalLight(0xffffff,1)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024,1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

directionalLight2.castShadow = true
directionalLight2.shadow.mapSize.set(1024,1024)
directionalLight2.shadow.camera.far = 15
directionalLight2.shadow.normalBias = 0.05
directionalLight2.position.set(0.25, 2, -2.25)