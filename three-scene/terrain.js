import * as THREE from 'three';

export class Terrain {
    heights = [];

    constructor(scene) {
        console.log(scene);

        this.scene = scene;

        this.genRandomTerrain();
    }

    drawSquare(v) {
        const geometry = new THREE.BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array([
            v[0], v[1], v[2],
            v[3], v[4], v[5],
            v[6], v[7], v[8],

            v[6], v[7], v[8],
            v[9], v[10], v[11],
            v[0], v[1], v[2]
        ]);

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals()
        const material = new THREE.MeshBasicMaterial({ color: 0xFCF7DE });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = true;
        // mesh.receiveShadow = true;
        this.scene.add(mesh);
    }

    drawLine(v) {

    }

    genRandomTerrain() {
        for (let i = 0; i < 100; i++) {
            let xarr = [];
            for (let j = 0; j < 100; j++) {
                xarr[j] = Math.random() * 2 + 1;
            }
            this.heights[i] = xarr;

        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let v = [
                    i, this.heights[i][j + 1], j + 1,
                    i + 1, this.heights[i + 1][j + 1], j + 1,
                    i + 1, this.heights[i + 1][j], j,
                    i, this.heights[i][j], j,
                ];
                console.log(v);
                this.drawSquare(v);

                // v = [
                //     i, this.heights[i][j], j,
                //     i + 1, this.heights[i + 1][j], j,
                //     i + 1, this.heights[i + 1][j + 1], j + 1,
                //     i, this.heights[i][j + 1], j + 1,
                // ];
                // console.log(v);
                // this.drawSquare(v);

                // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
                // const points = [];
                // points.push(new THREE.Vector3(i, this.heights[i][j + 1] + 0.02, j + 1));
                // points.push(new THREE.Vector3(i + 1, this.heights[i + 1][j] + 0.02, j));

                // const geometry = new THREE.BufferGeometry().setFromPoints(points);
                // const line = new THREE.Line(geometry, material);
                // this.scene.add(line);
            }
        }
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        for (let i = 0; i < 10; i++) {
            const points = [];
            for (let j = 0; j < 10; j++) {
                points.push(new THREE.Vector3(i, this.heights[i][j] + 0.02, j));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }

        for (let j = 0; j < 10; j++) {
            const points = [];
            for (let i = 0; i < 10; i++) {
                points.push(new THREE.Vector3(i, this.heights[i][j] + 0.02, j));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }

        // const geometry = new THREE.PlaneGeometry(1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        // const plane = new THREE.Mesh(geometry, material);

        // this.scene.add( plane );
    }

}