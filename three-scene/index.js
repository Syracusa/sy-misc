
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'https://unpkg.com/three/examples/jsm/controls/FlyControls.js';

import { FirstPersonControls } from 'https://unpkg.com/three/examples/jsm/controls/FirstPersonControls.js';

import { Terrain } from './terrain.js';
import { Camera } from './camera.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);



// renderer
const renderer = new THREE.WebGLRenderer();

// enabling shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const sceneDomParent = document.getElementById("three_scene");
sceneDomParent.appendChild(renderer.domElement);
// renderer.setSize(window.innerWidth, window.innerHeight - 100);
renderer.setSize(sceneDomParent.offsetWidth, sceneDomParent.offsetHeight);

// plane geometry
const geometryP = new THREE.PlaneGeometry(100, 100);
const materialP = new THREE.MeshStandardMaterial({ color: 0xFCF7DE })
const plane = new THREE.Mesh(geometryP, materialP);

plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

let cam = new Camera();

let t = new Terrain(scene);
// t.genRandomTerrain();
// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// sphere geometry
const geometryS = new THREE.SphereGeometry(2, 32, 32);
const materialS = new THREE.MeshToonMaterial({
    color: 0xFFAACF,
    // wireframe: true,
});
// const materialS = new THREE.MeshPhongMaterial({
//     color: 0xFFAACF,
//     // wireframe: true,
// });

const sphere = new THREE.Mesh(geometryS, materialS);

let spherePos = { x: 8, y: 8, z: 8 };
sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
sphere.castShadow = true;
scene.add(sphere);


/* lightpos */
let lightPos = { x: 3, y: 15, z: 3 };

const geometrylightSource = new THREE.SphereGeometry(1, 8, 8);
const materiallightSource = new THREE.MeshStandardMaterial({
    color: 0xffffff
});

const lightSource = new THREE.Mesh(geometrylightSource, materiallightSource);
lightSource.position.set(lightPos.x, lightPos.y, lightPos.z);
scene.add(lightSource);

// light
let light = new THREE.DirectionalLight(0xa0a0a0, 0.5);
light.position.set(lightPos.x, lightPos.y, lightPos.z);
light.target.position.set(0, 0, 0);
light.castShadow = true;

light.shadow.mapSize.width = 10240 // default
light.shadow.mapSize.height = 10240 // default
light.shadow.camera.near = -20 // default
light.shadow.camera.far = 100 // default
light.shadow.camera.top = 10 // default
light.shadow.camera.right = 10 // default
light.shadow.camera.left = -10 // default
light.shadow.camera.bottom = -10 // default
scene.add(light);

// const ambientLight = new THREE.AmbientLight( 0x404040, 1 );
// scene.add(ambientLight);

// Control
let wPressed = 0;
let dPressed = 0;
let aPressed = 0;
let sPressed = 0;
let qPressed = 0;
let ePressed = 0;
let num1Pressed = 0;
let num2Pressed = 0;
let num3Pressed = 0;
let num4Pressed = 0;

window.onkeydown = (e) => {
    console.log(e.key + ' pressed');
    switch (e.key) {
        case 'w':
            wPressed = 1;
            break;
        case 'a':
            aPressed = 1;
            break;
        case 's':
            sPressed = 1;
            break;
        case 'd':
            dPressed = 1;
            break;
        case 'q':
            qPressed = 1;
            break;
        case 'e':
            ePressed = 1;
            break;
        case '1':
            num1Pressed = 1;
            break;
        case '2':
            num2Pressed = 1;
            break;
        case '3':
            num3Pressed = 1;
            break;
        case '4':
            num4Pressed = 1;
            break;
    }
}
window.onkeyup = (e) => {
    console.log(e.key + ' up');
    switch (e.key) {
        case 'w':
            wPressed = 0;
            break;
        case 'a':
            aPressed = 0;
            break;
        case 's':
            sPressed = 0;
            break;
        case 'd':
            dPressed = 0;
            break;
        case 'q':
            qPressed = 0;
            break;
        case 'e':
            ePressed = 0;
            break;
        case '1':
            num1Pressed = 0;
            break;
        case '2':
            num2Pressed = 0;
            break;
        case '3':
            num3Pressed = 0;
            break;
        case '4':
            num4Pressed = 0;
            break;
    }
}

/*
canvasElem.onmousedown = function (e) {
    console.log("Mouse down pos : " + e.clientX + ", " + e.clientY + "");
}
*/

let oldTime = Date.now();

function inputControl(timeDiff) {
    timeDiff *= 0.1;
    if (wPressed) {
        cam.GoFront(timeDiff);
    }
    if (sPressed) {
        cam.GoBack(timeDiff);
    }
    if (aPressed) {
        cam.GoLeft(timeDiff);
    }
    if (dPressed) {
        cam.GoRight(timeDiff);
    }
    if (qPressed) {
        cam.LeftRotate(timeDiff);
    }
    if (ePressed) {
        cam.RightRotate(timeDiff);
    }

    if (num1Pressed) {
        cam.ViewFar(timeDiff);
    }
    if (num2Pressed) {
        cam.ViewNear(timeDiff);
    }
    if (num3Pressed) {
        cam.GetClose(0.1 * timeDiff);
    }
    if (num4Pressed) {
        cam.GetClose(-0.1 * timeDiff);
    }
}


// rendering function
function animate() {
    requestAnimationFrame(animate);


    let currtime = Date.now();
    let timeDiff = currtime - oldTime;
    oldTime = currtime;

    inputControl(timeDiff);
    // spherePos.y += 0.01 * timeDiff;
    // lightPos.x += 0.002 * timeDiff;
    // lightPos.y -= 0.002* timeDiff;

    sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
    light.position.set(lightPos.x, lightPos.y, lightPos.z);
    lightSource.position.set(lightPos.x, lightPos.y, lightPos.z);

    cam.UpdateCamera();

    // controls.update();
    renderer.render(scene, cam.camera);
};

animate();
