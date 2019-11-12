import * as dat from 'dat.gui';

export default class DatGui {

    constructor() {
        this.gui = new dat.GUI();
    }

    static getInstance() {
        if (_instance == null) {
            _instance = new DatGui();
        }
        return _instance;
    }

}

let _instance = null;