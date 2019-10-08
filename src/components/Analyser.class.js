import { AudioListener, Audio, AudioLoader, AudioAnalyser } from "three";

export default class Analyser {

    constructor(fileName, resolution, camera = false) {
        let listener = null;
        if (camera) {
            listener = new AudioListener();
            camera.add(listener);
        }
        const sound = new Audio(listener);
        const audioLoader = new AudioLoader();
        audioLoader.load(`src/sounds/${fileName}`, function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
        this.analyserNode = new AudioAnalyser(sound, resolution);
    }
}