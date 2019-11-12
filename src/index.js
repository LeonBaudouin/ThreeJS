import './sass/index.scss';
import * as THREE from "three";
import BaseObject3d from './components/Abstract/BaseObject3d.class';
import ThreeScene from './components/ThreeScene';
import ScaleOnHover from './components/Controllers/ScaleOnHover';
import Easing from './components/Math/Easing';
import SimplexNoise from 'simplex-noise';
import { Mesh } from 'three';
import DatGui from './components/Events/DatGui.class';

// const centerCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0x00ff00}));
const screenSize = new THREE.Vector3(10, 10, 10);
let dataLength = 0;

fetch('assets/trackerData1.txt')
    .then(r => r.text())
    .then(text => text.split('\n').map(e => e.split(';').map(Number)))
    .then(nbrs => {
        dataLength = nbrs.length;
        const intervals = nbrs.reduce((acc, cur) => {
            const newAcc = [{...acc[0]}, {...acc[1]}, {...acc[2]}];
            newAcc[0].min = acc[0].min > cur[1] ? cur[1] : acc[0].min;
            newAcc[0].max = acc[0].max < cur[1] ? cur[1] : acc[0].max;
            newAcc[1].min = acc[1].min > cur[2] ? cur[2] : acc[1].min;
            newAcc[1].max = acc[1].max < cur[2] ? cur[2] : acc[1].max;
            newAcc[2].min = acc[2].min > cur[3] ? cur[3] : acc[2].min;
            newAcc[2].max = acc[2].max < cur[3] ? cur[3] : acc[2].max;
            return newAcc;
        }, [{min: nbrs[0][1], max: nbrs[0][1]}, {min: nbrs[0][2], max: nbrs[0][2]}, {min: nbrs[0][3], max: nbrs[0][3]}])

        const dataSize = new THREE.Vector3(intervals[0].max - intervals[0].min, intervals[1].max - intervals[1].min, intervals[2].max - intervals[2].min)

        const ratio = new THREE.Vector3(screenSize.x / dataSize.x, screenSize.y / dataSize.y, screenSize.z / dataSize.z);

        return nbrs.map(e => new THREE.Vector3(
            (intervals[0].max - e[1]) * ratio.x - screenSize.x / 2,
            (intervals[1].max - e[2]) * ratio.y - screenSize.y / 2,
            (intervals[2].max - e[3]) * ratio.z - screenSize.z / 2
        ))
    })
    .then(createObjects)

function createObjects(data) {
const objects = [
    new BaseObject3d(
        () => {
            const pointsGeometry = new THREE.Geometry();
            pointsGeometry.vertices = data;
            const pointsMaterial = new THREE.PointsMaterial(
                {
                    color: 0x00ffff,
                    size: 0.01,
                    map: THREE.ImageUtils.loadTexture("assets/particle.png"),
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                });
            return new THREE.Points(pointsGeometry, pointsMaterial);
        }
    ),
    new BaseObject3d(
        () => {
            const pointsGeometry = new THREE.Geometry();
            const size = 500;
            for (let i = 0; i < dataLength - size; i++) {
                const slice = data.slice(i, i + size)
                const addition = slice.reduce((acc, cur) => acc.add(cur), new THREE.Vector3(0, 0, 0));
                const average = addition.multiply(new THREE.Vector3(1 / size, 1 / size, 1 / size));
                pointsGeometry.vertices.push(average);
            }
            const pointsMaterial = new THREE.PointsMaterial(
                {
                    color: 0xffff00,
                    size: 0.02,
                    map: THREE.ImageUtils.loadTexture("assets/particle.png"),
                    transparent: true
                });
            return new THREE.Points(pointsGeometry, pointsMaterial);
        }
    ),
    new BaseObject3d(
        () => {
            const geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0))
            const planeMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
            const plane = new THREE.Line(geometry, planeMaterial)
            return plane;
        }
    ),
    new BaseObject3d(
        () => {
            const geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0))
            const planeMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
            const plane = new THREE.Line(geometry, planeMaterial)
            return plane;
        }
    ),
    new BaseObject3d(
        () => {
            const geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 5))
            const planeMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
            const plane = new THREE.Line(geometry, planeMaterial)
            return plane;
        }
    ),
    new BaseObject3d(
        () => new THREE.AmbientLight(0x404040),
    ),
    new BaseObject3d(
        () => {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
            directionalLight.position.set(-6, 6, 4);
            return directionalLight;
        }
    )
]

    const threeScene = new ThreeScene(objects);
    raf(threeScene)

}

function raf(threeScene) {
    requestAnimationFrame(() => raf(threeScene))
    threeScene.update();
}
