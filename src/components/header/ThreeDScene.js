import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";

import RippleShader from "../../shaders/Ripple";

import { AsciiEffect } from "../../shaders/AsciiEffect";

class ThreeDScene extends React.Component {
  // Create Scene + Camera
  componentDidMount() {
    const mainScene = new THREE.Scene();
    const FONT_MAP_SIZE = new THREE.Vector2(48, 48);
    const FONT_CHAR_SIZE = new THREE.Vector2(4, 4);
    const DEFAULT_LAYER = 0;
    const OCCLUSION_LAYER = 1;

    var invert = true;

    const mainCamera = new THREE.PerspectiveCamera(
      3,
      window.innerWidth / window.innerHeight,
      1,
      50
    );
    mainCamera.position.z = 10;
    mainCamera.position.y = 0.3;
    const occlusionCamera = mainCamera.clone();
    occlusionCamera.layers.set(OCCLUSION_LAYER);

    // Add Point Lights

    const backLight = new THREE.PointLight(0x1b03a3, 3, 25);
    backLight.layers.enable(OCCLUSION_LAYER);
    backLight.position.set(0, 2, 0);
    mainScene.add(backLight);

    const fillLight = new THREE.PointLight(0x0ee3ff, 1.5, 20);
    fillLight.layers.enable(OCCLUSION_LAYER);
    fillLight.position.set(0, -0.9, 0);
    mainScene.add(fillLight);

    const keyLight = new THREE.PointLight(0x00a698, 2, 2);
    keyLight.layers.enable(OCCLUSION_LAYER);
    keyLight.position.set(0, 1, 0);
    mainScene.add(keyLight);

    // Create Renderer

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //asccii effect
    const effect = new AsciiEffect(renderer, " .:-=+*10 ", {
      invert: false,
    });
    effect.setSize(window.innerWidth - 50, window.innerHeight);
    effect.domElement.style.color = "green";
    effect.domElement.style.backgroundColor = "black";

    //this.mount.appendChild(effect.domElement);
    this.mount.appendChild(renderer.domElement);
    // Load 3D Model

    const loader = new GLTFLoader();

    const modelContainer = new THREE.Group();
    modelContainer.layers.enable(OCCLUSION_LAYER);
    mainScene.add(modelContainer);

    loader.load(
      "./scene.glb",
      (gltf) => {
        // Add default mesh
        modelContainer.add(gltf.scene);
        // Add black mesh set to occlusion Layer
        const occlusionScene = gltf.scene.clone();
        const blackMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x000000),
        });
        occlusionScene.traverse((node) => {
          if (node.material) {
            node.material = blackMaterial;
          }
          if (node.layers) {
            node.layers.set(OCCLUSION_LAYER);
          }
        });
        modelContainer.add(occlusionScene);
      },
      undefined,
      console.error
    );
    modelContainer.rotation.y = 5;
    modelContainer.position.x = -0.15;

    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    const depthTexture = new THREE.DepthTexture();
    depthTexture.type = THREE.UnsignedShortType;
    renderTarget.depthTexture = depthTexture;

    // Ripple Effect

    const RIPPLE_SPEED = 0.3;
    const RIPPLE_PEAK = 0.2;

    const ripples = [];
    const rippleCanvas = document.createElement("canvas");
    rippleCanvas.width = rippleCanvas.style.width = window.innerWidth;
    rippleCanvas.height = rippleCanvas.style.height = window.innerHeight;
    const rippleContext = rippleCanvas.getContext("2d");
    const rippleTexture = new THREE.Texture(rippleCanvas);
    rippleTexture.minFilter = THREE.NearestFilter;
    rippleTexture.magFilter = THREE.NearestFilter;

    let rippleWasRendering = false;

    const linear = (t) => t;
    const easeOutQuart = (t) => 1 - --t * t * t * t;

    function renderRipples(delta) {
      if (ripples.length) {
        rippleWasRendering = true;

        rippleContext.fillStyle = "rgb(128, 128, 0)";
        rippleContext.fillRect(0, 0, rippleCanvas.width, rippleCanvas.height);

        ripples.forEach((ripple, i) => {
          ripple.age += delta * RIPPLE_SPEED;

          if (ripple.age > 1) {
            ripples.splice(i, 1);
            return;
          }

          const size = rippleCanvas.height * easeOutQuart(ripple.age);

          const alpha =
            ripple.age < RIPPLE_PEAK
              ? easeOutQuart(ripple.age / RIPPLE_PEAK)
              : 1 - linear((ripple.age - RIPPLE_PEAK) / (1 - RIPPLE_PEAK));

          let grd = rippleContext.createRadialGradient(
            ripple.position.x,
            ripple.position.y,
            size * 0.25,
            ripple.position.x,
            ripple.position.y,
            size
          );

          grd.addColorStop(1, `rgba(128, 128, 0, 0.5)`);
          grd.addColorStop(
            0.8,
            `rgba(${ripple.color.x}, ${ripple.color.y}, ${
              16 * alpha
            }, ${alpha})`
          );
          grd.addColorStop(0, `rgba(0, 0, 0, 0)`);

          rippleContext.beginPath();
          rippleContext.fillStyle = grd;
          rippleContext.arc(
            ripple.position.x,
            ripple.position.y,
            size,
            0,
            Math.PI * 2
          );
          rippleContext.fill();
        });

        rippleTexture.needsUpdate = true;
      } else if (rippleWasRendering) {
        rippleContext.fillStyle = "rgb(128, 128, 0)";
        rippleContext.fillRect(0, 0, rippleCanvas.width, rippleCanvas.height);

        rippleWasRendering = false;
        rippleTexture.needsUpdate = true;
      }
    }

    function addRipple(event) {
      ripples.push({
        age: 0,
        position: new THREE.Vector2(event.clientX, event.clientY),
        color: new THREE.Vector2(
          (event.clientX / window.innerWidth) * 255,
          (event.clientY / window.innerHeight) * 255
        ),
      });
    }
    this.mount.addEventListener("click", addRipple);

    // ASCII Effect

    const fontLoader = new THREE.TextureLoader();
    const fontFile = require("../../assets/font.png");
    const tFont = fontLoader.load(fontFile);
    tFont.minFilter = THREE.NearestFilter;
    tFont.magFilter = THREE.NearestFilter;

    function getLowResSize() {
      const charCountPrecise = [
        window.innerWidth / FONT_CHAR_SIZE.x,
        window.innerHeight / FONT_CHAR_SIZE.y,
      ];

      const charCountCeil = charCountPrecise.map(Math.ceil);

      return {
        charCountPrecise,
        charCountCeil,
      };
    }

    // Mouse Move

    function mousemove(e) {
      modelContainer.rotation.y = 6;
      modelContainer.rotation.y =
        2 * ((e.clientX / window.innerWidth) * 0.8 - 1);
    }
    this.mount.addEventListener("mousemove", mousemove);

    //effect composer
    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(mainScene, mainCamera));

    const filmPass = new FilmPass(0.6, 0.025, 648, false);
    //composer.addPass(filmPass);

    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms["damp"].value = 0.98;
    composer.addPass(afterimagePass);

    const glitchPass = new GlitchPass();
    //composer.addPass(glitchPass);

    const dotPass = new DotScreenPass();
    composer.addPass(dotPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.25;
    bloomPass.strength = 2;
    bloomPass.radius = 0.2;

    composer.addPass(bloomPass);

    const ripplePass = new ShaderPass(RippleShader());
    ripplePass.uniforms.tRipple.value = rippleTexture;
    ripplePass.needsSwap = false;
    composer.addPass(ripplePass);

    // Handle Window Resize

    function resizeRenderer() {
      rippleCanvas.width = rippleCanvas.style.width = window.innerWidth;
      rippleCanvas.height = rippleCanvas.style.height = window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      mainCamera.aspect = window.innerWidth / window.innerHeight;
      mainCamera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resizeRenderer);

    // Render Scene
    resizeRenderer();
    const clock = new THREE.Clock();

    function render() {
      const delta = clock.getDelta();

      // Render

      renderRipples(delta);

      renderer.setRenderTarget(renderTarget);
      renderer.render(mainScene, mainCamera);

      renderer.setRenderTarget(null);
      composer.render();

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
