import React from 'react';
import logo from './logo.svg';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    // Create Scene + Camera

const mainScene = new THREE.Scene()

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

const keyLight = new THREE.PointLight(0xff00ff, 2, 20)
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
mainScene.add(modelContainer)

loader.load(
  "./scene.glb",
  gltf => {
    modelContainer.add(gltf.scene)
  },
  undefined,
  console.error
)

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


  modelContainer.rotation.y += delta * 0.5

  
  renderer.render(mainScene, mainCamera)
  
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
