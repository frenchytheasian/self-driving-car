class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {
        /*
        Update car position based on key commands and physics
        */
        this.#move();
    }

    #move() {
        // Move the car forward or back based on key presses
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        // Set a max speed for the car. If it is going faster than this speed in either direction
        // reset the speed to the cap.
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        // // Add a friction component that is always trying to slow the car down
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        // Sometimes the friction never balances out the speed to zero. This solves that
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // left and right arrows control turning of the car
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        // Draws a small rectangle that will be the car
        ctx.beginPath();
        ctx.rect(
            -(this.width / 2),
            -(this.height / 2),
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}