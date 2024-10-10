import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { onWindowResize } from "../main.ts";
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateArticle } from "../utils.ts";

export function microplus(){

  const data = {
    title: 'Microplus',
    description: 'Es una garrapata de gran importancia veterinaria que afecta al ganado en regiones tropicales y subtropicales. En Yucatán, es un ectoparásito común en bovinos, donde causa enfermedades como la babesiosis y la anaplasmosis, las cuales impactan negativamente la producción ganadera. Esta garrapata se alimenta de la sangre del ganado, provocando pérdida de peso, menor producción de leche y, en casos severos, la muerte de los animales. Las condiciones cálidas y húmedas de Yucatán favorecen su proliferación.'
  }

  const canvas = generateArticle(data)
  onWindowResize()
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
  const directionalLight = createDirectionalLight()
  const ambientLight =  createAmbientLight()
  scene.add(ambientLight)
  scene.add(directionalLight)

  controls.autoRotate = true
  controls.autoRotateSpeed = 15
  controls.enablePan = false
  controls.enableZoom = false

  // Obtener el modal y el texto del porcentaje
  const loadingModal = document.getElementById('loadingModal');
  const loadingText = document.getElementById('loadingText');

  // Mostrar el modal
  if (loadingModal) {
    loadingModal.style.display = 'block';
  }

  // Cargar el modelo .OBJ
  const loader = new OBJLoader();
  loader.load(
    'microplus.3.1.obj', // Ruta al archivo .obj
    (object) => {
      // Recorrer el objeto para acceder a las mallas
      object.traverse((child) => {
        if (child instanceof Mesh) {
          // Aquí puedes modificar la posición o cualquier otra propiedad
          child.position.set(0, 0, 0); // Cambiar la posición del objeto
          child.receiveShadow = true;  // Si quieres que el objeto reciba sombras
          child.rotateX(Math.PI/180 * 90)
        }
      });
      // Añadir el objeto cargado a la escena
      scene.add(object);
      // Ocultar el modal cuando se complete la carga
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }
    },
    (xhr) => {
      // Calcular el porcentaje de carga
      const percentage = Math.round((xhr.loaded / xhr.total) * 100);

      console.log(percentage + '% cargado');
      
      // Actualizar el texto del modal con el porcentaje de carga
      if (loadingText) {
        loadingText.textContent = `Cargando objeto 3D... ${percentage}%`;
      }
    },
    (error) => {
      console.log('Ocurrió un error al cargar el OBJ:', error);  // Manejo de errores
    }
  );
  
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }

  animate();

}