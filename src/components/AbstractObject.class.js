export default class AbstractObject {
    addToScene(scene) {
        throw new Error(`Method ${arguments.callee.toString()} not implemented`);
    }
    
    update(time) {
        throw new Error(`Method ${arguments.callee.toString()} not implemented`);
    }
}