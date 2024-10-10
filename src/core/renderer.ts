import { WebGLRenderer, PCFShadowMap } from "three";
import { sizes } from "../main";

export function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
	const renderer =  new WebGLRenderer({
		canvas,
		alpha: true
	})

		
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFShadowMap
	
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))

	window.addEventListener('resize',()=>{
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
	})

	return renderer
}


