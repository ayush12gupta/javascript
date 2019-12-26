var canvas=document.querySelector('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');

window.addEventListener('resize',(event)=>{
 console.log(event);
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

var maxRadius=30;
var minRadius=4;

var color=[
           '#234D51',
           '#9DD3D9',
           '#59C6D1',
           '#3B4F51',
           '#FF513F']

function Circle(x,y,dx,dy,radius){  //JS Object
      this.x=x;
      this.y=y;
      this.dx=dx;
      this.dy=dy;
      this.radius=radius;
      this.minRadius=radius;
      this.colour=color[Math.floor(Math.random()*color.length)]
      this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.colour;    
        c.fill() 
       }
        this.update= function(){
        if(this.x + this.radius>innerWidth||this.x-radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight||this.y-this.radius<0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        
         //Interaction
         if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
         if(this.radius<maxRadius+Math.random())
          this.radius+=1;
        }
        else if(this.radius>minRadius) {
          this.radius=this.minRadius;
        }
        this.draw(); 
        
        }
        
}

var arrayCircle=[]

init();//To call the function for the first time

function init(){  //To create a whole new set of circles for the screen
            
  arrayCircle=[]//So that the no of circles is always just 800 and not keeps on multipling everytime we resize

for (var i = 0; i < 1000; i++) {
   var radius=Math.random()*4;
   var x=Math.random()*(innerWidth-radius*2)+radius;
   var dx=(Math.random()-0.5);
   var y=Math.random()*(innerHeight-radius*2)+radius;
   var dy=(Math.random()-0.5);
   arrayCircle.push(new Circle(x,y,dx,dy,radius))
}
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)    
    for (var i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update();
    }
  }

  animate();