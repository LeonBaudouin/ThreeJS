export default class BaseObject3d {
    constructor(object3dCallback, controllers = [], children = []) {
        this.object3d =  object3dCallback();
        this.controllers = controllers;
        this.children = children;
        this.children.forEach(child => {
            this.object3d.add(child)
        });
    }

    update() {
        this.controllers.forEach(controller => {
            if (typeof controller == 'function') {
                controller(this.object3d)
            } else {
                controller.update(this.object3d)
            }
        });
        this.children.forEach(child => {
            child.update()
        });
    }
}