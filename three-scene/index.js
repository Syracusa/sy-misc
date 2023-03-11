
import * as THREE from 'three';
import { Controller } from './controller.js';
import { MySceneContext } from './scene.js';

let ctx = new MySceneContext();

/*
canvasElem.onmousedown = function (e) {
    console.log("Mouse down pos : " + e.clientX + ", " + e.clientY + "");
}
*/

let controller = new Controller();

function inputControl(timeDiff) {
    timeDiff *= 0.1;
    if (controller.isKeyPressed('w')) {
        ctx.cam.GoFront(timeDiff);
    }
    if (controller.isKeyPressed('s')) {
        ctx.cam.GoBack(timeDiff);
    }
    if (controller.isKeyPressed('a')) {
        ctx.cam.GoLeft(timeDiff);
    }
    if (controller.isKeyPressed('d')) {
        ctx.cam.GoRight(timeDiff);
    }
    if (controller.isKeyPressed('q')) {
        ctx.cam.LeftRotate(timeDiff);
    }
    if (controller.isKeyPressed('e')) {
        ctx.cam.RightRotate(timeDiff);
    }
    if (controller.isKeyPressed('1')) {
        ctx.cam.ViewFar(timeDiff);
    }
    if (controller.isKeyPressed('2')) {
        ctx.cam.ViewNear(timeDiff);
    }
    if (controller.isKeyPressed('3')) {
        ctx.cam.GetClose(0.1 * timeDiff);
    }
    if (controller.isKeyPressed('4')) {
        ctx.cam.GetClose(-0.1 * timeDiff);
    }
}

let oldTime = Date.now();
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
