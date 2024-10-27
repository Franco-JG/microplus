import {  DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // Cambiar OBJLoader por GLTFLoader

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { onWindowResize } from "../main.ts";
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateArticle } from "../utils.ts";

export function materialTest(){

  const data = {
    title: 'Material glb test',
    description: 'Prueba de carga de una esfera creada en Blender 2.93.9 con mapa de uv, color, roughness y desplazamiento, hecho con material procedural y exportado en formato .glb'
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
  camera.position.z = 4

  controls.autoRotate = true
  controls.autoRotateSpeed = 5
  controls.enablePan = false


  // Cargar el modelo .GLB en lugar de .OBJ
  const loader = new GLTFLoader();
  loader.load(
    'test_material2.glb', // Ruta al archivo .glb
    (gltf) => {
      // // Recorrer el modelo gltf.scene para acceder a las mallas
      // gltf.scene.traverse((child) => {
      //   if (child instanceof Mesh) {
      //     // Modificar la posición o cualquier otra propiedad
      //     // child.receiveShadow = true;
      //     child.castShadow = true
      //     // child.rotation.x = Math.PI/180 * 90
      //     child.position.y = 0
      //   }
      // });
      const sphereGLB = gltf.scene.children[0];
      sphereGLB.position.set(0,0,0)
      // console.log(sphereGLB);
      

      // Añadir el objeto cargado a la escena
      scene.add(sphereGLB);

    },
    (xhr) => {
      xhr.loaded === xhr.total ? console.log('Modelo GLB cargado.') : null;
      
    },
    (error) => {
      console.log('Ocurrió un error al cargar el GLB:', error);  // Manejo de errores
    }
  );
  
  // scene.add(new AxesHelper(50))

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  animate();

}
