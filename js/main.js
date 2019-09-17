class Cube {
    object3D
    position
    offset

    constructor(scene, position, offset) {
        const {x, y, z} = position
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff })
        this.offset = offset
        this.defaultPosition = position
        this.object3D = new THREE.Mesh(geometry, material)
        this.object3D.position.set(x, y, z)
        scene.add(this.object3D)
    }

    update(t) {
        const state = t < this.offset ? 0 : (t - this.offset) / (1 - this.offset)
        this.object3D.position.y = this.defaultPosition.y + easeInOutQuart(state) * 3
        this.object3D.rotation.z = easeInOutQuart(state) * Math.PI
    }
}


const CUBE_ANIMATION_DURATION = 0.5

const WIDTH = 11
const HEIGHT = 11

const CAMERA_FACTOR = 100
const CAMERA_WIDTH = window.innerWidth / CAMERA_FACTOR
const CAMERA_HEIGHT = window.innerHeight / CAMERA_FACTOR

const CAMERA_POSITION = 1

const CYCLE = 240

let t = 0;

const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(CAMERA_WIDTH / - 2, CAMERA_WIDTH / 2, CAMERA_HEIGHT / 2, CAMERA_HEIGHT / - 2, 1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(25, 50, 25)
scene.add(light)

const counterLight = new THREE.DirectionalLight(0x00aaff, 0.5)
counterLight.position.set(- 25, 50, 25)
scene.add(counterLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const cubes = [];

for (let j = 0; j < HEIGHT; j++) {
    const width = j%2 == 0 ? WIDTH : WIDTH + 1
    for (let i = 0; i < width; i++) {
        const x = j%2 == 1 ? i - (WIDTH - j) / 2 : i - (WIDTH - 1 - j) / 2
        const y = j - (HEIGHT / 2) - 3
        const z = x - j
        const offset = (HEIGHT - j) / HEIGHT * CUBE_ANIMATION_DURATION
        cubes.push(new Cube(scene, {x: x, y: y, z: z}, offset))
    }
}

camera.position.set(- CAMERA_POSITION,  CAMERA_POSITION,  CAMERA_POSITION)
camera.lookAt(0, 0, 0)

window.addEventListener('resize', () => {
    const width = Math.floor(window.innerWidth)
    const height = Math.floor(window.innerHeight)
    renderer.setSize(width, height)
    
    const CAMERA_WIDTH = window.innerWidth / CAMERA_FACTOR
    const CAMERA_HEIGHT = window.innerHeight / CAMERA_FACTOR
    camera.left = CAMERA_WIDTH / - 2
    camera.right = CAMERA_WIDTH / 2
    camera.top = CAMERA_HEIGHT / 2
    camera.bottom = CAMERA_HEIGHT / - 2
    camera.updateProjectionMatrix()
})


gameLoop();
function gameLoop() {
    update()
    render()
	requestAnimationFrame(gameLoop)
}

function update() {
    t = (t + 1) % CYCLE;
    const state = t / CYCLE
    cubes.forEach(cube => {
        cube.update(state)
    });
    camera.position.y = CAMERA_POSITION + state * 3
}

function render() {
    renderer.render(scene, camera)
}

function easeInOutQuart (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }