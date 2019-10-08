import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import { AudioListener, Audio, AudioLoader, AudioAnalyser } from "three";

const AUDIO_RESOLUTION = 32;

class ThreeScene {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.controls;
    this.audioAnalyser;
    window.addEventListener("resize", () => this.resizeCanvas);
    this.init();
    this.setupAudio('slobber.mp3', 32);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, -12);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 0;

    let geometry = new THREE.PlaneGeometry(10, 1, AUDIO_RESOLUTION, 1);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide, wireframe: true});
    let plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -5;
    this.scene.add(plane)

    let light = new THREE.AmbientLight();
    let pointLight = new THREE.PointLight();
    pointLight.position.set(10, 10, 0);
    this.scene.add(light, pointLight);
  }

  setupAudio(fileName, resolution) {
    const listener = new AudioListener();
    this.camera.add(listener);
    const sound = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load(`src/sounds/${fileName}`, function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
    this.audioAnalyser = new AudioAnalyser(sound, resolution);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    if (this.audioAnalyser) {
      console.log(this.audioAnalyser.getFrequencyData());
    }
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export {
  ThreeScene as
  default
};
