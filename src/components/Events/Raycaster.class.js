import MouseMoveEvent from "./MouseMoveEvent.class";
import * as THREE from "three";

const _watchedObjects = new Map();
let _instance = null;

export class Raycaster {
    
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.mouseEvent = MouseMoveEvent.getInstance();
    }

    static getInstance() {
        if (_instance == null) {
            _instance = new Raycaster();
        }
        return _instance;
    }

    update(camera) {
        const mouse = this.mouseEvent.getValue();
        if (mouse) {
            this.raycaster.setFromCamera(mouse, camera);
            const intersects = this.raycaster.intersectObjects([..._watchedObjects.keys()]).map(e => e.object);
            [..._watchedObjects.keys()].forEach(object => {
                _watchedObjects.get(object)(-1 !== intersects.indexOf(object));
            });
        }
    }

    addObjectToWatch(object, callback) {
        _watchedObjects.set(object, callback);
    }

}