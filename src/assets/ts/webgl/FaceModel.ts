import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import faceModel from "../../model/face.glb";
import { getImagePositionAndSize, ImagePositionAndSize } from "../utils/getElementSize";
import fragmentShader from "../../shader/list/fragmentShader.glsl"
import vertexShader from "../../shader/list/vertexShader.glsl"

export class FaceModel {
  setup: Setup;
  element: HTMLImageElement | null
  material: THREE.ShaderMaterial | null

  constructor(setup: Setup) {
    this.setup = setup;
    this.element = document.querySelector<HTMLImageElement>('.js-mv-image')
    this.material = null
  }

  init() {
    if(!this.element) return;
    const info = getImagePositionAndSize(this.element);
    this.setMaterial(info);
    this.setModel();
  }

  setUniforms(info: ImagePositionAndSize) {
    const loader = this.setup.loader;
    
    const commonUniforms = {
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
    };

    return {
      uPlaneSize: { value: new THREE.Vector2(info.dom.width, info.dom.height)},
      uTexture: { value: loader.load(info.image.src) },
      uTextureSize: { value: new THREE.Vector2(info.image.width, info.image.height) },
      ...commonUniforms
    }
  }

  setMaterial(info: ImagePositionAndSize) {
    const uniforms = this.setUniforms(info);
    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    })
  }

  setModel() {
    const loader = new GLTFLoader();
    loader.load(
      faceModel,
      (gltf) => {
        const faceModel = gltf.scene;
        const faceModelMesh = faceModel.children[0].children[0].children[0];
        (faceModelMesh as any).material = this.material

        faceModel.position.set(-270, -155, 10);
        this.setup.scene?.add(faceModel);
      },
      undefined,
      (error) => {
        console.log(error);
      }
    );
  }
}
