import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import './core/orbit-controls.ts'
import './style.css'
import { camera } from './core/camera.ts';
import { renderer, updateRenderer } from './core/renderer.ts'
import { ambientLight, directionalLight, directionalLight2 } from './core/lights.ts';

//Scene
const scene = new THREE.Scene()
scene.add(ambientLight)
scene.add(directionalLight)
scene.add(directionalLight2)

//* Activar sombras en el renderizador
renderer.shadowMap.enabled = true;

//* Asegurarse de que la luz direccional proyecte sombras
directionalLight.castShadow = true;

// Cargar el modelo .OBJ
const loader = new OBJLoader();
loader.load(
  'microplus.3.1.obj', // Ruta al archivo .obj
  (object) => {
    // Recorrer el objeto para acceder a las mallas
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Aquí puedes modificar la posición o cualquier otra propiedad
        child.position.set(0, 0, 0); // Cambiar la posición del objeto
        child.receiveShadow = true;  // Si quieres que el objeto reciba sombras
        child.rotateX(Math.PI/180 * -90)
      }
    });
    // Añadir el objeto cargado a la escena
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% cargado'); // Progreso de carga
  },
  (error) => {
    console.log('Ocurrió un error al cargar el OBJ:', error);  // Manejo de errores
  }
);

// Carga del HDRI
const rgbeLoader = new RGBELoader();
      rgbeLoader.load('field.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;  // Tipo de mapeado equirectangular
        scene.environment = texture;  // Aplicar el HDRI como entorno de la escena
        scene.background = texture;   // (Opcional) Aplicar el HDRI como fondo de la escena
      });


scene.add(camera);
updateRenderer();

const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()