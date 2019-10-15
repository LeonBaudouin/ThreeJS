import * as THREE from "three";

let _instance = null; 

export default class MouseMoveEvent {

    constructor() {
        this.value;
        document.addEventListener('mousemove', e => this.updateValue(e), false);
    }

    updateValue(e) {
        this.value = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            - (e.clientY / window.innerHeight) * 2 + 1
        );
    }

    getValue() {
        return this.value;
    }

    static getInstance() {
        if (_instance == null) {
            _instance = new MouseMoveEvent();
        }
        return _instance;
    }

}