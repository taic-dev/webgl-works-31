import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { PARAMS } from "./constants";

export class Setup {
  renderer: THREE.WebGLRenderer | null
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  ambientLight: THREE.AmbientLight | null
  directionalLight: THREE.DirectionalLight | null;
  rectLight: THREE.RectAreaLight | null;
  loader: THREE.TextureLoader
  controls: OrbitControls | null

  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.ambientLight = null;
    this.directionalLight = null
    this.rectLight = null;
    this.controls = null;
    this.loader = new THREE.TextureLoader();

    this.init();
  }

  init() {
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setRectAreaLight();
    // this.setAmbientLight();
    // this.setDirectionalLight();
    this.setHelper();
  }

  setRenderer() {
    const element = document.querySelector('.webgl');
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(new THREE.Color(0x00000))
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    element?.appendChild(this.renderer.domElement);
  }

  updateRenderer() {
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
    this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );
    this.camera.position.set(0, 0, 40);
  }

  updateCamera() {
    if (!this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera?.updateProjectionMatrix();
    this.camera.position.set(0, 0, 40);
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    this.directionalLight.position.set(0, 5, 10);
    this.scene?.add(this.directionalLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    this.scene?.add(this.ambientLight);
  }

  setRectAreaLight() {
    RectAreaLightUniformsLib.init();
    this.rectLight = new THREE.RectAreaLight(0xffffff, 1, 30, 40);
    this.rectLight.position.set(0, 0, -20);
    this.rectLight.lookAt(0, 0, 0);
    this.scene?.add(this.rectLight);
  }

  setHelper() {
    if (!this.camera || !this.rectLight) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene?.add(axesHelper);

    // RectLight
    this.scene?.add(new RectAreaLightHelper(this.rectLight));
  }

  resize() {
    this.updateRenderer();
    this.updateCamera();
  }
}