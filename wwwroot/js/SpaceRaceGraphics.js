// finish adding signalr

// runs canvas graphics

let canvas, ctx;
let ships = [];
let bodies = [];
let gravitation = 500;

window.addEventListener("load", () => {
    canvas = document.getElementById("game");
    canvas.width = 800;
    canvas.height = 800;

    ctx = canvas.getContext("2d");
    bodies.push(new body(20, 50, canvas.width / 2, canvas.clientHeight / 2));
    bodies.push(new body(10, 50, 500, 700));
    ships.push(new Ship(20, 30, 750, 750, 0, -8));
    setInterval(() => { animate() }, 10);
});


function animate() {
    // clear canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw celectial bodies
    bodies.forEach(body => body.draw(ctx));
    // draw ships
    ships.forEach(ship => ship.draw(ctx));
}

class Ship {
    constructor(size, color, xPosition, yPosition, xVelocity, yVelocity) {
        this.size = size;
        this.color = color;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    draw(ctx) {
        // update position
        this.updatePosition();
        // draw ship
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.xPosition, this.yPosition, this.size, this.size);
    }

    updatePosition() {
        // calculate change in x and y for a single step in time
        bodies.forEach(body => {
            let a = body.xPosition - this.xPosition; // distance x from body
            let b = body.yPosition - this.yPosition; // distance y from body
            let distance = Math.sqrt((a * a) + (b * b)); // distance between ship and body
            let force = (gravitation * body.mass) / (distance * distance); // attraction applied
            let angle = Math.atan2(a, b);
            this.xVelocity += Math.sin(angle) * force;
            this.yVelocity += Math.cos(angle) * force;
        });
        this.xPosition += this.xVelocity;
        this.yPosition += this.yVelocity;
    }
}

class body {
    constructor(size, mass, xPosition, yPosition) {
        this.size = size;
        this.mass = mass;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    draw(ctx) {
        // draw celetial body
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}