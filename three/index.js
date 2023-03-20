/* From threejs examples */
import * as THREE from 'three';

import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
const FLOOR = - 250;

let camera, controls, scene, renderer;
let container;

const NEAR = 10, FAR = 3000;

let light;
const clock = new THREE.Clock();

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 23, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR );
    camera.position.set( 700, 50, 1900 );

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x59472b );
    scene.fog = new THREE.Fog( 0x59472b, 1000, FAR );

    // LIGHTS
    const ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 5, 0.3 );
    light.position.set( 0, 1500, 1000 );
    light.target.position.set( 0, 0, 0 );

    light.castShadow = true;
    light.shadow.camera.near = 1200;
    light.shadow.camera.far = 2500;
    light.shadow.bias = 0.0001;

    light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    scene.add( light );
    createScene();

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.autoClear = false;

    //
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // CONTROLS
    controls = new FirstPersonControls( camera, renderer.domElement );

    controls.lookSpeed = 0.0125;
    controls.movementSpeed = 500;
    controls.noFly = false;
    controls.lookVertical = true;

    controls.lookAt( scene.position );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    controls.handleResize();
}

function createScene( ) {
    // GROUND
    const geometry = new THREE.PlaneGeometry( 100, 100 );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffb851 } );

    const ground = new THREE.Mesh( geometry, planeMaterial );

    ground.position.set( 0, FLOOR, 0 );
    ground.rotation.x = - Math.PI / 2;
    ground.scale.set( 100, 100, 100 );

    ground.castShadow = false;
    ground.receiveShadow = true;

    scene.add( ground );

    // TEXT
    const loader = new FontLoader();
    loader.load( '../node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
        const textGeo = new TextGeometry( 'THREE.JS', {

            font: font,

            size: 200,
            height: 50,
            curveSegments: 12,

            bevelThickness: 2,
            bevelSize: 5,
            bevelEnabled: true

        } );

        textGeo.computeBoundingBox();
        const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

        const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

        const mesh = new THREE.Mesh( textGeo, textMaterial );
        mesh.position.x = centerOffset;
        mesh.position.y = FLOOR + 67;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

    } );

    // CUBES
    const cubes1 = new THREE.Mesh( new THREE.BoxGeometry( 1500, 220, 150 ), planeMaterial );

    cubes1.position.y = FLOOR - 50;
    cubes1.position.z = 20;

    cubes1.castShadow = true;
    cubes1.receiveShadow = true;

    scene.add( cubes1 );

    const cubes2 = new THREE.Mesh( new THREE.BoxGeometry( 1600, 170, 250 ), planeMaterial );

    cubes2.position.y = FLOOR - 50;
    cubes2.position.z = 20;

    cubes2.castShadow = true;
    cubes2.receiveShadow = true;

    scene.add( cubes2 );
}

function animate() {
    requestAnimationFrame( animate );

    render();
}

function render() {
    const delta = clock.getDelta();
    
    renderer.clear();
    renderer.render( scene, camera );
}
