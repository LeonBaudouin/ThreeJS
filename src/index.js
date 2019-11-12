import './sass/index.scss';
import * as THREE from "three";
import BaseObject3d from './components/Abstract/BaseObject3d.class';
import ThreeScene from './components/ThreeScene';
import ScaleOnHover from './components/Controllers/ScaleOnHover';
import Easing from './components/Math/Easing';
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise(Math.random);

let cubes = [];
for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        for (let z = 0; z < 10; z++) {
            cubes.push(generateCube(5 - x,  5 - y, 5 - z))
        }
    }
}

const objects = [
    ...cubes,
    new BaseObject3d(
        () => new THREE.AmbientLight(0xffffff, 0.8),
    ),
    new BaseObject3d(
        () => {
            const light = new THREE.PointLight(0xff0000);
            light.position.set(-40, 50, 20);
            return light;
        }
    ),
    new BaseObject3d(
        () => {
            const light = new THREE.PointLight(0x0000ff, 0.2);
            light.position.set(30, 10, -50);
            return light;
        }
    )
]

const threeScene = new ThreeScene(objects);

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()

function generateCube(x, y, z) {
    return new BaseObject3d(
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({color: 0xffffff,transparent: true})
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            return mesh;
        },
        [
            (object3d, time) => {
                object3d.material.opacity = simplex.noise4D(x / 10, y / 10, z / 10, time / 300);
            }
        ]
    )
}