var canvas=document.querySelector('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})

var mouse={
    x:undefined,
    y:undefined,
}

window.addEventListener('mousemove',(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
})

var x;
var y;
var dx;
var color;
var dy;
var c=canvas.getContext('2d');

//Object of Circle
function Circle(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=color;

    this.draw=function(){   
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }

    this.update=function(){
        this.draw();
    }
}

//Implementation
let circle1;
var circle2;
function init(){
    circle1=new Circle(300,300,100,80,100,'black')
    circle2=new Circle(10,10,30,30,30,'red');
}

//Distance
function getDistance(x2,x1,y1,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;   
    
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2))
}

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height)
    circle1.update();
    circle2.x=mouse.x;
    circle2.y=mouse.y;
    circle2.update();

    if(getDistance(circle2.x,circle1.x,circle2.y,circle1.y)<circle1.radius+circle2.radius){
          circle1.color='red';
    }
    else{
        circle1.color='black'
    }
}

init();
animate();