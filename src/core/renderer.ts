import { WebGLRenderer, PCFShadowMap } from "three";
import { sizes } from "./camera.ts";


//Renderer
const canvas: HTMLElement = document.querySelector('#scene') as HTMLElement

export const renderer =  new WebGLRenderer({
    canvas,
  })
  
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap

export function updateRenderer() {
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height =  window.innerHeight
	updateRenderer()
})