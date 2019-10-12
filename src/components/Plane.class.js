import * as THREE from "three";

const HEIGHT = 0;

export default class Plane {

    constructor(width, depth) {
        this.mesh;
        this.width = width;
        this.depth = depth;
        this.lastFramePosition = new Array(width * depth).fill(HEIGHT);
        this.init();
    }
    
    init() {
        const particleGeometry = new THREE.PlaneGeometry(2, 2, this.width - 1, this.depth - 1);
        const particleMaterial = new THREE.MeshLambertMaterial({
            color: 0xdddddd 
        });
        this.mesh = new THREE.Mesh(particleGeometry, particleMaterial)
        this.mesh.rotateX( -Math.PI / 2)
    }

    update(newLineData) {
        const lastFramePosition = this.mesh.geometry.vertices.map(particle => particle.z);
        this.mesh.geometry.vertices.forEach((particle, index) => {
            if (index < this.width) {
                this.mesh.geometry.vertices[index].z = newLineData[index % this.width] / 400 + HEIGHT;
            } else {
                this.mesh.geometry.vertices[index].z = this.lastFramePosition[index - this.width] * 0.95;
            }
        });
        this.lastFramePosition = lastFramePosition;
        this.mesh.geometry.verticesNeedUpdate = true;
        this.mesh.geometry.computeFaceNormals();
        this.mesh.geometry.computeVertexNormals();
        this.mesh.geometry._dirtyNormals = true;
    }
}