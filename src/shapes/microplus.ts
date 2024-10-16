import { AxesHelper, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // Cambiar OBJLoader por GLTFLoader

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { onWindowResize } from "../main.ts";
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateArticle } from "../utils.ts";

export function microplus(){

  const data = {
    title: 'Rhipicephalus (Boophilus) microplus',
    description: 'Es una garrapata de gran importancia veterinaria que afecta al ganado en regiones tropicales y subtropicales. En Yucatán, es un ectoparásito común en bovinos, donde causa enfermedades como la babesiosis y la anaplasmosis, las cuales impactan negativamente la producción ganadera. Esta garrapata se alimenta de la sangre del ganado, provocando pérdida de peso, menor producción de leche y, en casos severos, la muerte de los animales. Las condiciones cálidas y húmedas de Yucatán favorecen su proliferación.'
  }

  const canvas = generateArticle(data)
  onWindowResize()
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
  const directionalLight = createDirectionalLight()
  const directionalLight2 = createDirectionalLight()
  const ambientLight =  createAmbientLight()
  scene.add(ambientLight)
  scene.add(directionalLight)
  directionalLight2.position.set(0, -5, 0)
  scene.add(directionalLight2)

  controls.autoRotate = true
  controls.autoRotateSpeed = 15
  controls.enablePan = false

  // Obtener el modal y el texto del porcentaje
  const loadingModal = document.getElementById('loadingModal');
  const loadingText = document.getElementById('loadingText');

  // Mostrar el modal
  if (loadingModal) {
    loadingModal.style.display = 'block';
  }

  // Cargar el modelo .GLB en lugar de .OBJ
  const loader = new GLTFLoader();
  loader.load(
    'microplus.2.blend7.glb', // Ruta al archivo .glb
    (gltf) => {
      // Recorrer el modelo gltf.scene para acceder a las mallas
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          // Modificar la posición o cualquier otra propiedad
          child.receiveShadow = true;
          child.rotation.x = Math.PI/180 * -90
        }
      });

      // Añadir el objeto cargado a la escena
      scene.add(gltf.scene);

      // Ocultar el modal cuando se complete la carga
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }
    },
    (xhr) => {
      xhr.loaded === xhr.total ? console.log('Modelo GLB cargado.') : null;
      
      // Calcular el porcentaje de carga
      const percentage = Math.round((xhr.loaded / xhr.total) * 100);      
      
      // Actualizar el texto del modal con el porcentaje de carga
      if (loadingText) {
        loadingText.textContent = `Cargando objeto 3D... ${percentage}%`;
      }
    },
    (error) => {
      console.log('Ocurrió un error al cargar el GLB:', error);  // Manejo de errores
    }
  );
  
  scene.add(new AxesHelper(20))

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  animate();

}
