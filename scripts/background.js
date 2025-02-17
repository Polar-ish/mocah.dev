let mousex;
let mousey;
const canvas = document.querySelector(".background");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var density = 0.05;
function clamp(start, num, end){
    if(num < start) return start;
    if(num > end) return end;
    return num;
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "white";
    draw_grid(canvas.width*density, canvas.height*density);
    ctx.fill();
}

function resize(){
    canvas.setAttribute("width", canvas.clientWidth);
    canvas.setAttribute("height", canvas.clientHeight);
    draw();
}


onresize = (event) => {
    resize();
}

onmousemove = (event) => {
    mousex = event.x;
    mousey = event.y;
}


function draw_grid(w, h){
    let dot_min = 1;
    let dot_max = 5;
    let dot_dist_min = 50;
    let dot_dist_max = 200;
    for(let x = 0; x < canvas.width; x += canvas.width/w){
        for(let y = 0; y < canvas.height; y += canvas.height/h){
            let dist = Math.hypot(y - mousey, x - mousex);
            let dist_normalized = 1 - clamp(dot_dist_min, dist, dot_dist_max) / dot_dist_max;
            ctx.moveTo(x, y);
            ctx.ellipse(x, y, dot_min + dot_max*dist_normalized, dot_min + dot_max*dist_normalized, 0, 2*Math.PI, 0);    

        }
    }
}



resize();
setInterval(() => {
    draw();
}, 100);