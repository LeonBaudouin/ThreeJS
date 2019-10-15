import AbstractController from "../Abstract/AbstractController.class";
import { Raycaster } from "../Events/Raycaster.class";

export default class ScaleOnHover extends AbstractController {

    constructor({duration, startScale, endScale, easeInFunc, easeOutFunc}) {
        super();
        this.duration = duration;
        this.startScale = startScale; 
        this.endScale = endScale; 
        this.easeInFunc = easeInFunc; 
        this.easeOutFunc = easeOutFunc;
        this.raycaster = Raycaster.getInstance();
        this.isHovered = false;
        this.currentTime = 0;
        // 0: idle, 1: hovered and still, 2: scale up, 3: scale down
        this.animation = 0;
    }

    onMount(object3d) {
        this.raycaster.addObjectToWatch(object3d, intersect => {
            this.isHovered = intersect
        });
    }

    update(object3d) {
        if (this.animation == 0 && this.isHovered) {
            this.animation = 2;
            this.currentTime = 0;
        }

        if (this.animation == 1 && !this.isHovered) {
            this.animation = 3;
            this.currentTime = 0;
        }

        if (this.animation == 2) {
            if (this.currentTime > this.duration) {
                this.animation = 1;
                this.currentTime = 0;
            } else {
                const scale = this.easeInFunc(this.currentTime, this.startScale, this.endScale - this.startScale, this.duration);
                object3d.scale.set(scale, scale, scale);
                this.currentTime++;
            }
        }

        if (this.animation == 3) {
            if (this.currentTime > this.duration) {
                this.animation = 0;
                this.currentTime = 0;
            } else {
                const scale = this.easeOutFunc(this.currentTime, this.endScale, this.startScale - this.endScale, this.duration);
                object3d.scale.set(scale, scale, scale);
                this.currentTime++;
            }
        }
    }

}