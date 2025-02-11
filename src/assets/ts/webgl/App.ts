import { FaceModel } from "./FaceModel";
import { Setup } from "./Setup";

export class App {
  setup: Setup
  faceModel: FaceModel

  constructor() {
    this.setup = new Setup();
    this.faceModel = new FaceModel(this.setup);
  }

  init() {
    this.faceModel.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.faceModel.raf();
  }

  update() {

  }

  resize() {
    this.setup.resize();
  }
}