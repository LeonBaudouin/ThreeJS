import * as THREE from "three";
import AbstractObject from './AbstractObject.class'

export default class Cube extends AbstractObject {

    constructor() {
        super();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.mesh = new THREE.Mesh(geometry, material);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(time) {
        this.mesh.rotateY(0.02)
        this.mesh.rotateX(0.01)
    }
}