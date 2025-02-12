import { gsap } from "gsap";
import { EASING } from "../utils/constant";

export class Animation {

  onceScale(target: any) {
    gsap.fromTo(target, {
      x: 0, y: 0, z: 0,
    }, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
      ease: EASING.OUT_BACK
    });
  }

  repeatPosition(target: any) {
    gsap.to(target, {
      y: 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  repeatScale(target: any) {
    gsap.to(target, {
      x: 1.05,
      y: 1.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}