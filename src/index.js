import './sass/index.scss';
import * as THREE from "three";
import BaseObject3d from './components/Abstract/BaseObject3d.class';
import ThreeScene from './components/ThreeScene';
import BounceOnBox from './components/Controllers/BounceOnBox';
import DatGui from './components/DatGui';

const geometry =  new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
const boxMesh = new THREE.Mesh(geometry, material);
let acceleration = new THREE.Vector3(0, -0.1, 0);
const rotation = new THREE.Vector3(0, 0, 0);
DatGui.getInstance().add(rotation, 'x', 0, 1, null, (value) => {
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), value );
    acceleration.applyQuaternion( quaternion );
});

const objects = [
    new BaseObject3d(
        () => {
            var geometry = new THREE.PlaneGeometry( 10, 10 );
            var material = new THREE.MeshBasicMaterial( {color: 0x999999, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry, material );
            plane.rotateX(Math.PI / 2);
            plane.position.y = -4;
            return plane;
        }
    ),
    new BaseObject3d(
        () => {
            const object = new THREE.Object3D();
            object.rotation.set(rotation.x, rotation.y, rotation.z);
            return object;
        },
        {},
        [
            (object3D) => {
                object3D.rotation.set(rotation.x, rotation.y, rotation.z);
            }
        ],
        [
            new BaseObject3d(
                () => boxMesh
            ),
            new BaseObject3d(
                () => {
                    const geometry =  new THREE.IcosahedronGeometry(0.5);
                    const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
                    return new THREE.Mesh(geometry, material);
                },
                {
                    speed: new THREE.Vector3(0, 0, 0),
                    acceleration
                },
                [
                    (object3D, state) => {
                        state.speed.add(state.acceleration);
                        object3D.position.add(state.speed);
                    },
                    new BounceOnBox({boxMesh})
                ]
            )
        ]
    ),
    new BaseObject3d(
        () => new THREE.AmbientLight(0x404040),
    ),
    new BaseObject3d(
        () => {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(-4, 5, 4);
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