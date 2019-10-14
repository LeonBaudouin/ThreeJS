import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

export default class ThreeScene {

  constructor(objects = []) {
    this.camera;
    this.scene;
    this.renderer;
    this.objects = objects
    this.controls;
    this.time = 0;
  
    this.bind();
    this.setupScene();
    this.setupCamera();
  }

  setupScene() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.objects.forEach(obj => obj.addToScene(this.scene))
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 0;
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.resizeCanvas);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.objects.forEach(obj => obj.update(this.time))
    this.time++;
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
