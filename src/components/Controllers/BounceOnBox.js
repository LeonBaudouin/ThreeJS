import AbstractController from "../Abstract/AbstractController.class";

export default class BounceOnBox extends AbstractController {

    constructor({boxMesh}) {
        super();
        this.box = boxMesh;
    }

    update(object3d, state) {
        const {height, width, depth} = this.box.geometry.parameters;
        const {x: bx, y: by, z: bz} = this.box.position;
        const {x, y, z} = object3d.position;
        const {radius} = object3d.geometry.parameters;

        if (x + radius > bx + width / 2) {
            state.speed.x *= -1;
            object3d.position.x = bx + width / 2 - radius;
        }
            
        if (x - radius < bx - width / 2) {
            state.speed.x *= -1;
            object3d.position.x = bx - width / 2 + radius;
        }

        if (y + radius > by + height / 2) {
            state.speed.y *= -1;
            object3d.position.y = by + height / 2 - radius;
        }

        if (y - radius < by - height / 2) {
            state.speed.y *= -1;
            object3d.position.y = by - height / 2 + radius;
        }

        if (z + radius > bz + depth / 2) {
            state.speed.z *= -1;
            object3d.position.z = bz + depth / 2 - radius;
        }

        if (z - radius < bz - depth / 2) {
            state.speed.z *= -1;
            object3d.position.z = bz - depth / 2 + radius;
        }
    }

}