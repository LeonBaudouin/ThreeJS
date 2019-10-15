import './sass/index.scss';
import * as THREE from "three";
import BaseObject3d from './components/Abstract/BaseObject3d.class';
import ThreeScene from './components/ThreeScene';
import ScaleOnHover from './components/Controllers/ScaleOnHover';
import Easing from './components/Math/Easing';

const objects = [
    new BaseObject3d(
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
            const mesh = new THREE.Mesh(geometry, material);
            return mesh;
        },
        [
            (object3d, time) => {
                object3d.rotateX(0.001);
                object3d.rotateY(0.005);
            },
            new ScaleOnHover({
                duration: 30,
                startScale: 1,
                endScale: 1.1,
                easeInFunc: Easing.easeInOutCubic,
                easeOutFunc: Easing.easeInOutCubic
            })
        ]
    ),
    new BaseObject3d(
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({color: 0xff0000});
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = -3;
            return mesh;
        },
        [
            (object3d, time) => {
                object3d.rotateX(0.001);
                object3d.rotateY(0.005);
            },
            new ScaleOnHover({
                duration: 30,
                startScale: 1,
                endScale: 1.1,
                easeInFunc: Easing.easeInOutCubic,
                easeOutFunc: Easing.easeInOutCubic
            })
        ]
    ),
    new BaseObject3d(
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = 3;
            return mesh;
        },
        [
            (object3d, time) => {
                object3d.rotateX(0.001);
                object3d.rotateY(0.005);
            },
            new ScaleOnHover({
                duration: 30,
                startScale: 1,
                endScale: 1.1,
                easeInFunc: Easing.easeInOutCubic,
                easeOutFunc: Easing.easeInOutCubic
            })
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