import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader.js";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";
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
    var isRendering;
    var animationFrame;

    const mainCamera = new THREE.PerspectiveCamera(
      3,
      window.innerWidth / window.innerHeight,
      1,
      50
    );
    mainCamera.position.z = 15;
    mainCamera.position.y = 0.04;
    mainCamera.position.x = -0.03;

    const occlusionCamera = mainCamera.clone();
    occlusionCamera.layers.set(OCCLUSION_LAYER);

    // Add Point Lights

    const backLight = new THREE.PointLight(0x0f995d, 3, 25);
    backLight.layers.enable(OCCLUSION_LAYER);
    backLight.position.set(1, 5, 1);
    mainScene.add(backLight);

    const fillLight = new THREE.PointLight(0xcce0fa, 1.5, 20);
    fillLight.layers.enable(OCCLUSION_LAYER);
    fillLight.position.set(0, -0.9, 0);
    mainScene.add(fillLight);

    const keyLight = new THREE.PointLight(0xccf1fa, 2, 2);
    keyLight.layers.enable(OCCLUSION_LAYER);
    keyLight.position.set(0, 4, 0);
    mainScene.add(keyLight);

    // Create Renderer

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //asccii effect
    const effect = new AsciiEffect(renderer, " .:-=+*10 ", {
      invert: false,
    });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = "green";
    effect.domElement.style.backgroundColor = "black";

    //mount for ascii effect
    //this.mount.appendChild(effect.domElement);

    //mount for composer effects
    this.mount.appendChild(renderer.domElement);

    // controls
    /*
    const controls = new OrbitControls(mainCamera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = false;
*/
    // Load 3D Model

    const loader = new GLTFLoader();

    const modelContainer = new THREE.Group();
    modelContainer.layers.enable(OCCLUSION_LAYER);
    mainScene.add(modelContainer);

    loader.load(
      "./" + this.props.object,
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
    modelContainer.rotation.y = -2;
    modelContainer.position.x = -0.05;
    modelContainer.rotation.x = -0.08;
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

    //Animations:

    // Mouse Move

    function mousemove(e) {
      modelContainer.rotation.y =
        2 * ((e.clientX / window.innerWidth) * 0.7 - 0.4);
    }
    if (this.props.animation == "follow") {
      this.mount.addEventListener("mousemove", mousemove);
    }

    //Rotate

    //effect composer
    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(mainScene, mainCamera));

    const effectGrayScale = new ShaderPass(LuminosityShader);
    composer.addPass(effectGrayScale);

    const sobelPass = new ShaderPass(SobelOperatorShader);
    sobelPass.uniforms["resolution"].value.x =
      window.innerWidth * window.devicePixelRatio;
    sobelPass.uniforms["resolution"].value.y =
      window.innerHeight * window.devicePixelRatio;
    composer.addPass(sobelPass);
    const params = {
      shape: 1,
      radius: 4,
      rotateR: Math.PI / 12,
      rotateB: (Math.PI / 12) * 2,
      rotateG: (Math.PI / 12) * 3,
      scatter: 0,
      blending: 1,
      blendingMode: 1,
      greyscale: false,
      disable: false,
    };
    const halftonePass = new HalftonePass(
      window.innerWidth,
      window.innerHeight,
      params
    );
    //composer.addPass(halftonePass);
    if (this.props.shaders == true) {
      const afterimagePass = new AfterimagePass();
      afterimagePass.uniforms["damp"].value = 0.85;
      composer.addPass(afterimagePass);

      const glitchPass = new GlitchPass();
      //composer.addPass(glitchPass);

      const dotPass = new DotScreenPass();
      //composer.addPass(dotPass);

      const outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        mainScene,
        mainCamera
      );
      outlinePass.edgeStrength = 4.0;
      outlinePass.edgeThickness = 1.0;
      outlinePass.visibleEdgeColor.set("#ffffff");
      outlinePass.hiddenEdgeColor.set("#190a05");
      composer.addPass(outlinePass);

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
    }
    // Handle Window Resize

    function resizeRenderer() {
      if (window.innerWidth <= 500) {
        rippleCanvas.width = rippleCanvas.style.width = window.innerWidth;
        rippleCanvas.height = rippleCanvas.style.height = window.innerHeight;
        modelContainer.position.x = 0;
        mainCamera.position.z = 33;
        mainCamera.position.y = 0.2;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mainCamera.aspect = window.innerWidth / window.innerHeight;
        mainCamera.updateProjectionMatrix();
      } else {
        rippleCanvas.width = rippleCanvas.style.width = window.innerWidth;
        rippleCanvas.height = rippleCanvas.style.height = window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mainCamera.aspect = window.innerWidth / window.innerHeight;
        mainCamera.updateProjectionMatrix();
      }
    }
    window.addEventListener("resize", resizeRenderer);

    // Render Scene
    resizeRenderer();
    const clock = new THREE.Clock();

    var stopRendering = (af) => {
      cancelAnimationFrame(af);
      isRendering = false;
    };

    function render() {
      const delta = clock.getDelta();

      // Render with composer effects (un comment code below)
      //=============================
      renderRipples(delta);

      renderer.setRenderTarget(renderTarget);
      renderer.render(mainScene, mainCamera);

      renderer.setRenderTarget(null);
      composer.render();
      //==============================
      modelContainer.rotation.y += 0.0025;

      animationFrame = requestAnimationFrame(render);

      isRendering = true;
      //Render with ascii effect (un comment code below)
      //==============================
      //effect.render(mainScene, mainCamera);
      //==============================
    }
    render();

    window.addEventListener("scroll", () => {
      var scrollPosition = window.scrollY;

      //element is almost about to be visible, time to start rendering
      if (scrollPosition < window.innerHeight + 1500) {
        if (!isRendering) {
          render();
        } else {
          //wait until everythingIsLoaded is true
        }
        //element is not visible, stop rendering
      } else {
        //need to stop rendering here!
        //this doesn't work, dunno how to do this
        if (animationFrame) {
          stopRendering(animationFrame);
        }
      }
    });
  }
  // === THREE.JS EXAMPLE CODE END ===
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default ThreeDScene;
