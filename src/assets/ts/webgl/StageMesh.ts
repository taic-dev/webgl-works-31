import * as THREE from "three";
import { Setup } from "./Setup";

export class StageMesh {
  setup: Setup;

  constructor(setup: Setup) {
    this.setup = setup;
  }

  init() {
    this.setMesh();
  }

  setMesh() {
    const geometry = new THREE.BoxGeometry( 2000, 0.1, 2000 );
		const material = new THREE.MeshStandardMaterial( { color: 0xbcbcbc, roughness: 0.1, metalness: 0 } );
		const mesh = new THREE.Mesh( geometry, material );
    mesh.position.y = -20
		this.setup.scene?.add( mesh );
  }
}