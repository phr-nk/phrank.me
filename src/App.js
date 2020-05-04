import React from 'react';
import logo from './logo.svg';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

//import DigitalGlitch from 'three/examples/jsm/shaders/DigitalGlitch'
import AdditiveShader from '../src/shaders/Additive'
import VolumetricLightScattering from '../src/shaders/VolumetricLightScattering'
import VolumetricLightCylinder from '../src/shaders/VolumetricLightCylinder'

// Render Layers

const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1

class App extends React.Component {
  componentDidMount() {
    // Create Scene + Camera

const mainScene = new THREE.Scene()


var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();

const mainCamera = new THREE.PerspectiveCamera(
  3,
  window.innerWidth / window.innerHeight,
  1,
  50
)
mainCamera.position.z = 10
mainCamera.position.y = 0.3


// Add Point Lights

const backLight = new THREE.PointLight(0x00aaff, 3, 20)
backLight.position.set(-5, 5, -5)
mainScene.add(backLight)

const fillLight = new THREE.PointLight(0x00aaff, 0.7, 20)
fillLight.position.set(-5, 0, 5)
mainScene.add(fillLight)

const keyLight = new THREE.PointLight(0x00FF00, 2, 20)
keyLight.position.set(5, 0, 0)
mainScene.add(keyLight)

// Create Renderer

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Load 3D Model

const loader = new GLTFLoader()
//const modelFile = require('./scene.glb')

const modelContainer = new THREE.Group()
modelContainer.layers.enable(OCCLUSION_LAYER)
mainScene.add(modelContainer)

loader.load(
  "./scene.glb",
  gltf => {
    // Add default mesh
    modelContainer.add(gltf.scene)

    // Add black mesh set to occlusion Layer
    const occlusionScene = gltf.scene.clone()
    const blackMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x000000),
    })
    occlusionScene.traverse(node => {
      if (node.material) {
        node.material = blackMaterial
      }
      if (node.layers) {
        node.layers.set(OCCLUSION_LAYER)
      }
    })
    modelContainer.add(occlusionScene)
  },
  undefined,
  console.error
)
modelContainer.rotation.y = 5
modelContainer.position.x = -0.15
// Mouse Move

function mousemove(e) {
  modelContainer.rotation.y = 6
  modelContainer.rotation.y = 2 * ((e.clientX / window.innerWidth) * 0.8 - 1)
  //backLight.position.x = lightCone.position.x
}
window.addEventListener('mousemove', mousemove)

// Handle Window Resize

function resizeRenderer() {
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  mainCamera.aspect = window.innerWidth / window.innerHeight
  mainCamera.updateProjectionMatrix()

}
//window.addEventListener('resize', debounce(resizeRenderer, 50))

// Render Scene

const clock = new THREE.Clock()

function render() {

 const delta = clock.getDelta()

  


  renderer.render(mainScene,mainCamera)
  requestAnimationFrame(render)
}
render()
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default App;
