import { AnimationMixer, Clock, LoopRepeat, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // Cambiar OBJLoader por GLTFLoader

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { onWindowResize } from "../main.ts";
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateArticle } from "../utils.ts";

export function microplusWalking(){

  const data = {
    title: 'Animación de caminata',
    description: 'Adipisicing ex tempor adipisicing velit adipisicing ipsum aliquip. Lorem ea proident nostrud do cupidatat in nisi consectetur consequat in ad. Officia cupidatat irure sit incididunt. Cillum deserunt quis laborum magna excepteur sit pariatur veniam culpa. Eu qui magna tempor officia eu ut veniam exercitation culpa proident.'
  }

  const canvas = generateArticle(data)
  onWindowResize()
  const scene = createScene()
  const camera = createCamera()
  camera.position.set(3,3,3)
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
  controls.autoRotateSpeed = 5
  controls.enablePan = false

  // Obtener el modal y el texto del porcentaje
  const loadingModal = document.getElementById('loadingModal');
  const loadingText = document.getElementById('loadingText');

  // Mostrar el modal
  if (loadingModal) {
    loadingModal.style.display = 'block';
  }

  let mixer : AnimationMixer;
  // Cargar el modelo .GLB en lugar de .OBJ
  const loader = new GLTFLoader();
  loader.load(
    'microplus_walking.gltf', // Ruta al archivo .gltf
    (gltf) => {
      const model = gltf.scene;
      // scene.add(model);

      // Configurar sombras en las mallas del modelo
      model.traverse((child) => {
        if (child instanceof Mesh && child.name == 'Plane') {
          child.castShadow = true;
          console.log(child);
          
        }
      });

      // Crear el AnimationMixer
      mixer = new AnimationMixer(model);
      const clips = gltf.animations;
    
      // Configurar cada clip de animación en bucle y reproducirlo
      clips.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.loop = LoopRepeat;  // Configurar para que se repita
        action.clampWhenFinished = false; // Continuar animando al final del ciclo
        action.play(); // Reproducir la animación
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
      
      // Actualizar el texto del modal con el porcentaje de carga
      if (loadingText) {
        loadingText.textContent = `Cargando objeto 3D...`;
      }
    },
    (error) => {
      console.log('Ocurrió un error al cargar el GLTF:', error);  // Manejo de errores
    }
  );
  
  // scene.add(new AxesHelper(20))
  const clock = new Clock();
  function animate() {
    const delta = 0.05
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    // Actualizar el mixer de animación si existe
    if (mixer) {
      mixer.update(delta);
    }
  }

  animate();

}
