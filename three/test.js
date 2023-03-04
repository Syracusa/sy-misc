
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'https://unpkg.com/three/examples/jsm/controls/FlyControls.js';

import { FirstPersonControls } from 'https://unpkg.com/three/examples/jsm/controls/FirstPersonControls.js';
 
// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );


let camPos = {x:0, y:6, z:10};
// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(camPos.x,camPos.y,camPos.z);


// renderer
const renderer = new THREE.WebGLRenderer();

// enabling shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// orbit controls
// const controls = new FirstPersonControls(camera, renderer.domElement);

// plane geometry
const geometryP = new THREE.PlaneGeometry(100, 100);
const materialP = new THREE.MeshStandardMaterial({color:0xffffff})
const plane = new THREE.Mesh(geometryP, materialP);

plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// sphere geometry
const geometryS = new THREE.SphereGeometry(2, 32, 32);
const materialS = new THREE.MeshStandardMaterial({
    color:0xffffff,
    wireframe: true,
});

const sphere = new THREE.Mesh(geometryS, materialS);

let spherePos = {x:0, y:3, z:0};
sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
sphere.castShadow = true;
scene.add(sphere);

let lightPos = {x:2, y:10, z:1};

const geometrylightSource = new THREE.SphereGeometry(1, 8, 8);
const materiallightSource = new THREE.MeshStandardMaterial({
    color:0xffffff
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

// rendering function
function animate() {	
    requestAnimationFrame(animate);


    spherePos.x += 0.01;
    lightPos.x += 0.02;
    sphere.position.set(spherePos.x, spherePos.y, spherePos.z);
    light.position.set(lightPos.x, lightPos.y, lightPos.z);
    lightSource.position.set(lightPos.x, lightPos.y, lightPos.z);
    
    camera.lookAt(spherePos.x, spherePos.y, spherePos.z);

    // camPos.x += 0.01;
    // camera.position.set(camPos.x,camPos.y,camPos.z);


    // controls.update();
    renderer.render(scene, camera);
};

animate();
