// finish adding signalr

// runs canvas graphics

let canvas, ctx;
let ships = [];
let bodies = [];

window.addEventListener("load", () => {
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener("mousedown", (e) => {
        animate();
    });

    ctx = canvas.getContext("2d");
    bodies.push(new body(20, 2, [canvas.width / 2, canvas.clientHeight / 2]));
    ships.push(new Ship(20, 30, [1200, 800], [0, 0], [0, 0]));
    animate();
});


function animate() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw celectial bodies
    bodies.forEach(body => body.draw(ctx));
    // draw ships
    ships.forEach(ship => ship.draw(ctx));
}

class Ship {
    constructor(size, color, position, velocity, acceleration) {
        this.size = size;
        this.color = color;
        this.position = position;
        if (velocity.length != 2) this.velocity = [0, 0];
        else this.velocity = velocity;
        if (acceleration.length != 2) this.acceleration = [0, 0];
        else this.acceleration = acceleration;
    }

    draw(ctx) {
        // update position
        this.updatePosition();
        // draw ship
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.position[0], this.position[1], this.size, this.size);
    }

    updatePosition() {
        // calculate change in x and y
        bodies.forEach(body => {
            let distanceX = body.position[0] - this.position[0];
            let distanceY = body.position[1] - this.position[1];
            this.velocity[0] = -5;
        });
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
    }
}

class body {
    constructor(size, mass, position) {
        this.size = size;
        this.mass = mass;
        if (position.length != 2) this.position = [0, 0];
        else this.position = position;
    }

    draw(ctx) {
        // draw celetial body
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.arc(this.position[0], this.position[1], this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}