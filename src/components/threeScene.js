import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import { AudioListener, Audio, AudioLoader, AudioAnalyser } from "three";
import ParticleSystem from "./ParticleSystem.class";
import Plane from "./Plane.class";

const AUDIO_RESOLUTION = 32;

class ThreeScene {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.controls;
    this.audioAnalyser;
    this.particleSystem;
    window.addEventListener("resize", () => this.resizeCanvas);
    this.init();
    this.setupAudio('BadRequest.wav', AUDIO_RESOLUTION * 2);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0.5, -1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 0;

    // this.particleSystem = new ParticleSystem(AUDIO_RESOLUTION, AUDIO_RESOLUTION);
    this.particleSystem = new Plane(AUDIO_RESOLUTION, AUDIO_RESOLUTION);
    this.scene.add(this.particleSystem.mesh);

    let light = new THREE.AmbientLight(0xffffff, 0.1);
    let pointLight = new THREE.SpotLight(0x5555ff, 1, 1000, Math.PI / 6);
    let secondPointLight = new THREE.SpotLight(0xff555555, 0.5, 1000, Math.PI / 6);
    pointLight.position.set(3, 1, 1.5);
    secondPointLight.position.set(0, 2, -3);
    this.scene.add(light, pointLight, secondPointLight);
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
      this.particleSystem.update(this.audioAnalyser.getFrequencyData());
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
