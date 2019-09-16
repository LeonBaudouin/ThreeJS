class Cube {

    SPEED = 0.02
    OFFSET_FACTOR = 5
    MAX_SIZE = 0.9

    object3D;
    offset;

    constructor(scene, {x, y, z}) {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
        this.object3D = new THREE.Mesh(geometry, material)
        this.object3D.position.set(x, y, z);
        const maxDistance = (new THREE.Vector3(0, 0, 0)).distanceTo(new THREE.Vector3(WIDTH, HEIGHT, DEPTH)) / ( 2 * this.OFFSET_FACTOR)
        const centerDistance = this.object3D.position.distanceTo(new THREE.Vector3(0, 0, 0))
        this.offset = centerDistance / maxDistance
        scene.add(this.object3D)
    }

    update(t) {
        const cos = Math.cos(this.SPEED * t + this.offset)
        const thresholdCos = cos <= 0 ? 0.0001 : cos
        const size = thresholdCos * this.MAX_SIZE
        this.object3D.material.color.setHSL(0, 0, thresholdCos)
        this.object3D.scale.x = size
        this.object3D.scale.y = size
        this.object3D.scale.z = size
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
light.position.set(25, 50, 25)
scene.add(light)

const counterLight = new THREE.PointLight(0xffaaaa, 0.5, 200)
counterLight.position.set(25, 50, -25)
scene.add(counterLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const HEIGHT = 9
const WIDTH = 9
const DEPTH = 9

const cubes = [];

for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
        for (let k = 0; k < DEPTH; k++) {
            cubes.push(new Cube(scene, {x: i - (WIDTH - 1) / 2, y: j - (HEIGHT - 1) / 2, z: k - (DEPTH - 1) / 2}))
        }   
    }
}

camera.position.z = 20

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
    cubes.forEach(cube => {
        cube.update(t)
    });
}

function render() {
    renderer.render(scene, camera)
}