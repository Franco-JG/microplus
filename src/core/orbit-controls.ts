import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { camera } from './camera.ts'
import { renderer } from './renderer.ts'

export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
