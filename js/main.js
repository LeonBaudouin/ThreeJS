class Cube {

    object3D;

    constructor(scene, position) {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        this.object3D = new THREE.Mesh(geometry, material)
        scene.add(this.object3D)
    }

    update(t) {
        this.object3D.scale.x = 0.5 * Math.cos(0.01 * t) + 0.5
        this.object3D.scale.y = 0.5 * Math.cos(0.01 * t) + 0.5
        this.object3D.scale.z = 0.5 * Math.cos(0.01 * t) + 0.5
    }
}




let t = 0;

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new THREE.OrbitControls(camera, renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.PointLight(0xffffff, 1, 200)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
light.position.set(25, 50, 25)
scene.add(light)
scene.add(ambientLight)

const HEIGHT = 10
const WIDTH = 10
const DEPTH = 10

for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
        for (let k = 0; k < DEPTH; k++) {
        }   
    }
}
const cube = new Cube(scene)

camera.position.z = 100

window.addEventListener('resize', () => {
    const width = Math.floor(window.innerWidth)
    const height = Math.floor(window.innerHeight)
    renderer.setSize(width, height)
    camera.updateProjectionMatrix()
    camera.aspect = width / height
})


gameLoop();
function gameLoop() {
    update()
    render()
	requestAnimationFrame(gameLoop)
}

function update() {
    t++;
    cube.update(t);
}

function render() {
    renderer.render(scene, camera)
}