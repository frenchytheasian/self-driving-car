const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight; // Resizing the canvas clears it at the same time
    car.draw(ctx);
    requestAnimationFrame(animate); // This function calls the animate function over and over multiple times a second
}
