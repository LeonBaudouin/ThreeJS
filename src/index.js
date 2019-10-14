import './sass/index.scss';
import ThreeScene from './components/ThreeScene'
import Cube from './components/Cube.class';

const cube = new Cube();
const threeScene = new ThreeScene([cube]);

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()