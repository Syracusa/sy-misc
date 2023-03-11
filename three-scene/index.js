
import * as THREE from 'three';
import { MySceneContext } from './scene.js';

let ctx = new MySceneContext();

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
        ctx.cam.GoFront(timeDiff);
    }
    if (sPressed) {
        ctx.cam.GoBack(timeDiff);
    }
    if (aPressed) {
        ctx.cam.GoLeft(timeDiff);
    }
    if (dPressed) {
        ctx.cam.GoRight(timeDiff);
    }
    if (qPressed) {
        ctx.cam.LeftRotate(timeDiff);
    }
    if (ePressed) {
        ctx.cam.RightRotate(timeDiff);
    }
    if (num1Pressed) {
        ctx.cam.ViewFar(timeDiff);
    }
    if (num2Pressed) {
        ctx.cam.ViewNear(timeDiff);
    }
    if (num3Pressed) {
        ctx.cam.GetClose(0.1 * timeDiff);
    }
    if (num4Pressed) {
        ctx.cam.GetClose(-0.1 * timeDiff);
    }
}


// rendering function
function animate() {
    requestAnimationFrame(animate);
    let currtime = Date.now();
    let timeDiff = currtime - oldTime;
    oldTime = currtime;
    inputControl(timeDiff);
    ctx.update();
};

animate();
