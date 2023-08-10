let canvas = document.querySelector('canvas');

const numStars = 200;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let ctx = canvas.getContext("2d");

colors = [
    "#FFB1A8",
    "#D96D48",
    "#FFC753",
    "#087D6F",
    "#F9F2E6"
];


let mouse = {
    x : undefined,
    y : undefined
};


window.addEventListener("resize", function(event) {
    this.location.reload();
})

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Circle{

    constructor(x, y, radius, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.minRadius = Math.random() * 10;
        this.maxRadius = Math.random() * 40;
    }

    draw = function(){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    update = function(){
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < this.maxRadius){
                this.radius += 2;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
    }
    

}

let circleArr = [];

for(let i = 0; i <= 2000; i++){
    let radius = 5;
    let x = Math.random() * (canvas.width - radius*2) + radius;
    let y = Math.random() * (canvas.height - radius*2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    circleArr.push(new Circle(x, y, radius, dx, dy))
}


// Animate movement (animation works by refreshing the page)

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i <= circleArr.length; i++){
        circleArr[i].draw();
        circleArr[i].update();
    }

    ctx.beginPath();
}

animate();
