import React from "react";
import logo from "./logo.svg";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./App.css";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

//import DigitalGlitch from 'three/examples/jsm/shaders/DigitalGlitch'
import AdditiveShader from "./shaders/Additive";
import VolumetricLightScattering from "./shaders/VolumetricLightScattering";
import VolumetricLightCylinder from "./shaders/VolumetricLightCylinder";

import { AsciiEffect } from "./shaders/AsciiEffect";
import VertexLitParticle from "./shaders/VertexLitParticle";

class ThreeDScene extends React.Component {
  // Create Scene + Camera
  componentDidMount() {
    const mainScene = new THREE.Scene();
    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var pointOfIntersection = new THREE.Vector3();

    var invert = true;

    const mainCamera = new THREE.PerspectiveCamera(
      3,
      window.innerWidth / window.innerHeight,
      1,
      50
    );
    mainCamera.position.z = 10;
    mainCamera.position.y = 0.3;

    // Add Point Lights

    const backLight = new THREE.PointLight(0x22fcd5, 3, 20);
    backLight.position.set(-5, 5, -5);
    mainScene.add(backLight);

    const fillLight = new THREE.PointLight(0x22fcd5, 0.7, 20);
    fillLight.position.set(-5, 10, 5);
    mainScene.add(fillLight);

    const keyLight = new THREE.PointLight(0x22fcd5, 2, 20);
    keyLight.position.set(5, 0, 0);
    mainScene.add(keyLight);

    // Create Renderer

    const renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, window.innerHeight)

    //document.body.appendChild(renderer.domElement)

    //asccii effect
    const effect = new AsciiEffect(renderer, " .,:;~|iI+h&03#`@", {
      invert: invert,
    });
    effect.setSize(window.innerWidth - 50, window.innerHeight);
    effect.domElement.style.color = "green";
    effect.domElement.style.backgroundColor = "black";

    //document.body.appendChild( effect.domElement );
    this.mount.appendChild(effect.domElement);
    // Load 3D Model

    const loader = new GLTFLoader();
    //const modelFile = require('./scene.glb')

    const modelContainer = new THREE.Group();
    //modelContainer.layers.enable(OCCLUSION_LAYER)
    mainScene.add(modelContainer);

    loader.load(
      "./scene.glb",
      (gltf) => {
        // Add default mesh
        modelContainer.add(gltf.scene);
      },
      undefined,
      console.error
    );
    modelContainer.rotation.y = 5;
    modelContainer.position.x = -0.15;
    // Mouse Move

    function mousemove(e) {
      modelContainer.rotation.y = 6;
      modelContainer.rotation.y =
        2 * ((e.clientX / window.innerWidth) * 0.8 - 1);
    }
    function mouseclick(e) {
      invert = false;
    }
    this.mount.addEventListener("mousemove", mousemove);
    this.mount.addEventListener("mouseclick", mouseclick);

    // Handle Window Resize

    function resizeRenderer() {
      //renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
      mainCamera.aspect = window.innerWidth / window.innerHeight;
      mainCamera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resizeRenderer);

    // Render Scene

    const clock = new THREE.Clock();

    function render() {
      const delta = clock.getDelta();

      //renderer.render(mainScene,mainCamera)
      effect.render(mainScene, mainCamera);
      requestAnimationFrame(render);
    }
    render();
  }
  // === THREE.JS EXAMPLE CODE END ===
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default ThreeDScene;
