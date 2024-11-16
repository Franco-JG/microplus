import './style.css'
import { microplus } from "./shapes/microplus.ts";
import { materialTest } from './shapes/material_test.ts';
import { microplusWalking } from './shapes/microplus_walking.ts';
// import { materialTest } from './shapes/material_test.ts';

export const sizes = {
  width: 0,
  height: 0
}


export function onWindowResize() {
  const article = document.querySelector('article');
  if (article) {
      sizes.width = article.clientWidth;
      sizes.height = (sizes.width * 9) / 16; //relación de aspecto 16:9
  }
}
window.addEventListener('resize', onWindowResize);

microplusWalking()
microplus()     //Genera el canvas
materialTest()

onWindowResize();  //Ajusta las medidas del canvas