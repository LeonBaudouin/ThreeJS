import * as THREE from "three";

const HEIGHT = 0;

export default class ParticleSystem {

    constructor(width, depth) {
        this.points;
        this.width = width;
        this.depth = depth;
        this.lastFramePosition = new Array(width * depth).fill(HEIGHT);
        this.init();
    }
    
    init() {
        const particleGeometry = new THREE.Geometry();

        for (let d = 0; d < this.depth; d++) {
            for (let w = 0; w < this.width; w++) {
                let particle = new THREE.Vector3((w  - this.width / 2 ) / 200, HEIGHT, (d - this.depth / 2) / 200);
                particleGeometry.vertices.push(particle);
            }
        }

        const particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xffffff,
                size: 0.01,
                map: THREE.ImageUtils.loadTexture("assets/particle.png"),
                blending: THREE.AdditiveBlending,
                transparent: true,
            });

        this.points = new THREE.Points(particleGeometry, particleMaterial);
    }

    update(newLineData) {
        const lastFramePosition = this.points.geometry.vertices.map(particle => particle.y);
        this.points.geometry.vertices.forEach((particle, index) => {
            if (index < this.width) {
                this.points.geometry.vertices[index].y = newLineData[index % this.width] / 400 + HEIGHT;
            } else {
                this.points.geometry.vertices[index].y = this.lastFramePosition[index - this.width] * 0.99;
            }
        });
        this.lastFramePosition = lastFramePosition;
        this.points.geometry.verticesNeedUpdate = true;
    }
}