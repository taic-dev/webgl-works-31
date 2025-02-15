import { Animation } from "./Animation";
import { FaceModel } from "./FaceModel";
import { Setup } from "./Setup";
import { StageMesh } from "./StageMesh";

export class App {
  setup: Setup
  animation: Animation
  stageMesh: StageMesh
  faceModel: FaceModel

  constructor() {
    this.setup = new Setup();
    this.stageMesh = new StageMesh(this.setup);
    this.faceModel = new FaceModel(this.setup);
    this.animation = new Animation(this.setup, this.faceModel);
  }

  init() {
    this.stageMesh.init();
    this.faceModel.init();
    this.animation.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.faceModel.raf();
  }

  resize() {
    this.setup.resize();
  }
}