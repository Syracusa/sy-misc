config = {
    "canvas_width": window.innerWidth,
    "canvas_height": window.innerHeight - 40,

    PrintName: 1
};

class Node {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.mass = 20;
        this.vx = 0;
        this.vy = 0;
        this.pressed = false;
    }
}

class Link {
    constructor(n1, n2, r) {
        this.n1 = n1;
        this.n2 = n2;
        this.r = r;
    }
}

class Scene {
    constructor() {

    }
}

let n1 = new Node(300, 300, "Node1");
let n2 = new Node(600, 300, "Node2");
let n3 = new Node(500, 100, "Node3");
let n4 = new Node(500, 400, "Node4");
let nodes = [n1, n2, n3, n4];

let l1 = new Link(n1, n2, 300);
let l2 = new Link(n3, n2, 424);
let l3 = new Link(n1, n3, 300);

let l4 = new Link(n1, n4, 424);
let l5 = new Link(n2, n4, 300);
let l6 = new Link(n3, n4, 300);
let links = [l1, l2, l3, l4, l5, l6];

let frame = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});

function init() {
    const mycanvas = document.getElementById("mycanvas");
    console.log('mycanvas : ' + mycanvas)
    mycanvas.width = config["canvas_width"];
    mycanvas.height = config["canvas_height"];

    window.requestAnimationFrame(draw);
    addMouseEventListener(mycanvas);
}

function checkNodePressed(x, y) {
    for (let i = 0; i < nodes.length; i++) {

        let node = nodes[i];
        let nodeSelXStart = node.x - node.mass;
        let nodeSelXEnd = node.x + node.mass;
        let nodeSelYStart = node.y - node.mass;
        let nodeSelYEnd = node.y + node.mass;

        if (x > nodeSelXStart && x < nodeSelXEnd &&
            y > nodeSelYStart && y < nodeSelYEnd) {

            console.log('Selected : ' + node.name);
            return node;
        }
    }
    return null;
}

function addMouseEventListener(canvasElem) {
    let nodeSel = null;
    let relX = 0;
    let relY = 0;

    canvasElem.onmousedown = function (e) {
        console.log("Mouse down pos : " + e.clientX + ", " + e.clientY + "");

        /* Check node pos */
        let pressedNode = checkNodePressed(e.clientX, e.clientY);
        if (pressedNode) {
            nodeSel = pressedNode;
            nodeSel.pressed = true;
            relX = e.clientX - nodeSel.x;
            relY = e.clientY - nodeSel.y;
            nodeSel.x = e.clientX - relX;
            nodeSel.y = e.clientY - relY;
        } else {
            /* Drag start */
        }
    }

    canvasElem.onmousemove = function (e) {
        // console.log("Mouse move pos : " + e.clientX + ", " + e.clientY + "");
        if (nodeSel != null) {
            nodeSel.x = e.clientX - relX;
            nodeSel.y = e.clientY - relY;
        }
    }
    canvasElem.onmouseup = function (e) {
        console.log("Mouse up pos :  " + e.clientX + ", " + e.clientY + "");
        if (nodeSel != null){
            nodeSel.pressed = false;
            nodeSel.x = e.clientX - relX;
            nodeSel.y = e.clientY - relY;
            nodeSel = null;
        }
    }
    canvasElem.onmouseout = function (e) {
        console.log("Mouse out pos : " + e.clientX + ", " + e.clientY + "");
        nodeSel = null;
    }
}

function getDistance(link) {
    dx = Math.abs(link.n1.x - link.n2.x);
    dy = Math.abs(link.n1.y - link.n2.y);

    return dist = Math.sqrt(dx * dx + dy * dy);
}

function draw_links(ctx, links) {
    for (let li = 0; li < links.length; li++) {
        let link = links[li];
        let n1 = link.n1;
        let n2 = link.n2;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(n1.x, n1.y); // Move the pen to (30, 50)
        ctx.lineTo(n2.x, n2.y); // Draw a line to (150, 100)

        dist = getDistance(link);
        difflen = Math.abs(dist - link.r)

        ctx.lineWidth = difflen / 40;
        if (ctx.lineWidth > 5)
            ctx.linkWidth = 5;
        else if (ctx.linkWidth < 3)
            ctx.linkwidth = 3;

        if (dist > link.r) {
            ctx.strokeStyle = '#009900';
        } else {
            ctx.strokeStyle = '#990000';
        }

        if (difflen < 50) {
            ctx.strokeStyle = '#000000';
        }

        ctx.stroke(); // Render the path
    }
}

function draw_nodes(ctx, nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.mass, 0, 2 * Math.PI);

        if (node.pressed == true){
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'green';
        }

        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.stroke();

        if (config.PrintName == 1) {
            ctx.fillStyle = 'black';
            ctx.font = "20px Sans-serif";
            ctx.fillText(node.name, node.x + node.mass, node.y - node.mass);
        }
    }
}

function draw() {
    const ctx = document.getElementById("mycanvas").getContext("2d");
    ctx.clearRect(0, 0, config["canvas_width"], config["canvas_height"]); // clear canvas

    frame += 1;
    ctx.font = "20px serif";
    ctx.fillText('Frame : ' + frame, 10, 20);

    draw_links(ctx, links);
    draw_nodes(ctx, nodes);

    window.requestAnimationFrame(draw);
}

