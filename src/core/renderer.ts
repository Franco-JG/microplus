import { WebGLRenderer, PCFShadowMap } from "three";
import { sizes } from "../main";

export function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
	const renderer =  new WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true
	})

		
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFShadowMap
	
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(window.devicePixelRatio)

	window.addEventListener('resize',()=>{
		renderer.setSize(sizes.width, sizes.height);
		// renderer.setPixelRatio(window.devicePixelRatio)
	})

	return renderer
}


