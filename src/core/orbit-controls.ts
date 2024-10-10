import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createOrbitControls(camera: PerspectiveCamera, renderer: WebGLRenderer){
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = true
    controls.enableRotate = true
    return controls;
}