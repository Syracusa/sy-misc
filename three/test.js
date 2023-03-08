
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'https://unpkg.com/three/examples/jsm/controls/FlyControls.js';

import { FirstPersonControls } from 'https://unpkg.com/three/examples/jsm/controls/FirstPersonControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);


let camPos = { x: 0, y: 10, z: 10 };
// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(camPos.x, camPos.y, camPos.z);
camera.lookAt(0,0,0);


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
const materialP = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
const plane = new THREE.Mesh(geometryP, materialP);

plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// sphere geometry
const geometryS = new THREE.SphereGeometry(2, 32, 32);
const materialS = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
});

const sphere = new THREE.Mesh(geometryS, materialS);

let spherePos = { x: 0, y: 3, z: 0 };
sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
sphere.castShadow = true;
scene.add(sphere);

let lightPos = { x: 2, y: 10, z: 1 };

const geometrylightSource = new THREE.SphereGeometry(1, 8, 8);
const materiallightSource = new THREE.MeshStandardMaterial({
    color: 0xffffff
});

const lightSource = new THREE.Mesh(geometrylightSource, materiallightSource);
lightSource.position.set(lightPos.x, lightPos.y, lightPos.z);
scene.add(lightSource);

// light
let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(lightPos.x, lightPos.y, lightPos.z);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);


// Control
let wPressed = 0;
let dPressed = 0;
let aPressed = 0;
let sPressed = 0;

window.onkeydown  = (e) => {
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
    }
}
window.onkeyup  = (e) => {
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
    }
}

/*
canvasElem.onmousedown = function (e) {
    console.log("Mouse down pos : " + e.clientX + ", " + e.clientY + "");
}
*/

let oldTime = Date.now();

function inputControl(timeDiff)
{
    if (wPressed) {
        camPos.z -= 0.01 * timeDiff;
    }
    if (sPressed) {
        camPos.z += 0.01 * timeDiff;
    }
    if (aPressed) {
        camPos.x -= 0.01 * timeDiff;
    }
    if (dPressed) {
        camPos.x += 0.01 * timeDiff;
    }
    
}

// rendering function
function animate() {
    requestAnimationFrame(animate);

    let currtime = Date.now();
    let timeDiff = currtime - oldTime;
    oldTime = currtime;

    inputControl(timeDiff);
    // spherePos.x += 0.01 * timeDiff;
    // lightPos.x += 0.02 * timeDiff;

    sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
    light.position.set(lightPos.x, lightPos.y, lightPos.z);
    lightSource.position.set(lightPos.x, lightPos.y, lightPos.z);

    // camera.lookAt(spherePos.x, spherePos.y, spherePos.z);
    camera.position.set(camPos.x,camPos.y,camPos.z);

    // controls.update();
    renderer.render(scene, camera);
};

animate();
