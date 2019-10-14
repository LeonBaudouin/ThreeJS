import './sass/index.scss';
import * as THREE from "three";
import BaseObject3d from './components/BaseObject3d.class';
import ThreeScene from './components/ThreeScene';

const objects = [
    new BaseObject3d(
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
            return new THREE.Mesh(geometry, material);
        },
        [
            (object3d) => {
                object3d.rotateX(0.0025);
                object3d.rotateY(0.005);
            }
        ]
    ),
    new BaseObject3d(
        () => new THREE.AmbientLight(0x404040),
    ),
    new BaseObject3d(
        () => {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(-4, 5, -2);
            return directionalLight;
        }
    )
]

const threeScene = new ThreeScene(objects);

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()