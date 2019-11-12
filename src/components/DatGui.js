import * as dat from 'dat.gui';

export default class DatGui {

    constructor() {
        this.gui = new dat.GUI();
    }

    add(object, property = null, min = null, max = null, step = null, cb = null) {
        const controller = this.gui.add(object, property, min, max, step);
        if (cb) {
            controller.onChange(cb);
        }
    }

    static getInstance() {
        if (_instance == null) {
            _instance = new DatGui();
        }
        return _instance;
    }

}

let _instance = null;