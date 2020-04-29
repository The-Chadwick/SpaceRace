// finish adding signalr

// runs canvas graphics
let canvas, ctx;
let ships = [];
let bodies = [];
let gravitation = 1;
let animationSpeed = 50;

window.addEventListener("load", () => {
    canvas = document.getElementById("game");
    canvas.width = 800;
    canvas.height = 800;

    ctx = canvas.getContext("2d");
    bodies.push(new Body(40, "rgb(255,5,5)", 40, canvas.width / 2, canvas.clientHeight / 2, -.5, 0));
    bodies.push(new Body(10, "rgb(255,0,225)", 20, canvas.width / 2, 600, 1.5, 0));
    bodies.push(new Body(10, "rgb(255,225,5)", 10, canvas.width / 2, 100, .25, 0));
    ships.push(new Ship(5, "rgb(255,0,255)", 750, 750, 0, -0.8594321));
    ships.push(new Ship(5, "rgb(0,0,255)", 100, 650, 2, 0.8001));
    setInterval(() => { animate() }, animationSpeed);
});


function animate() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw celectial bodies
    bodies.forEach(body => body.updatePosition());
    // draw ships
    ships.forEach(ship => ship.updatePosition());
}

class Body {

    constructor(size, color, mass, xPosition, yPosition, xVelocity, yVelocity) {
        this.size = size;
        this.color = color;
        this.mass = mass;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    draw() {
        // draw celetial body
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    updatePosition() {
        // calculate change in x and y for a single step in time
        bodies.forEach((body, index, bodyArray) => {
            if (body != this) {
                let a = body.xPosition - this.xPosition; // distance x from body
                let b = body.yPosition - this.yPosition; // distance y from body
                let distance = Math.sqrt((a * a) + (b * b)); // distance between two bodies
                let force = (gravitation * this.mass * body.mass) / (distance * distance); // attraction applied
                let angle = Math.atan2(a, b);
                this.xVelocity += Math.sin(angle) * force;
                this.yVelocity += Math.cos(angle) * force;
                if ((body.size + this.size) >= distance) {
                    // check to see if bodies collide and remove the one with less mass
                    bodyArray.splice(index, 1);
                    console.log("CELESTIAL COLLISION!");
                    console.log(body.size + " " + this.size + " " + distance);
                }
            } else return;
        });
        // update position
        this.xPosition += this.xVelocity;
        this.yPosition += this.yVelocity;
        this.draw();
    }

}

class Ship extends Body{

    constructor(size, color, xPosition, yPosition, xVelocity, yVelocity) {
        // default mass allows the simulation to be more 'gamelike',
        // but is not calculated as body during physics calculations
        super(size, color, 200, xPosition, yPosition, xVelocity, yVelocity);
    }

    draw() {
        // draw Ship
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPosition, this.yPosition, this.size, this.size);
    }
}