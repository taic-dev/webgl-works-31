import { gsap } from "gsap";
import { EASING } from "../utils/constant";
import { Setup } from "./Setup";
import { FaceModel } from "./FaceModel";

export class Animation {
  setup: Setup
  faceModel: FaceModel

  constructor(setup: Setup, faceModel: FaceModel) {
    this.setup = setup;
    this.faceModel = faceModel;
  }

  init() {
    this.turnOnTheLight();
    this.onceScale();

    setTimeout(() => {
      this.repeatPosition();
      this.repeatScale();
    }, 2000);
  }

  turnOnTheLight() {
    gsap.fromTo(this.setup.rectLight, {
      intensity: 0
    }, {
      intensity: 5,
      duration: 5,
      ease: EASING.TRANSFORM
    })
  }

  onceScale() {
    gsap.fromTo(this.faceModel.modelGroup.scale, {
      x: 0, y: 0, z: 0,
    }, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
      ease: EASING.TRANSFORM
    });
  }

  repeatPosition() {
    gsap.to(this.faceModel.modelGroup.position, {
      y: 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  repeatScale() {
    gsap.to(this.faceModel.modelGroup.scale, {
      x: 1.05,
      y: 1.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}