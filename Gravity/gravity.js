var canvas=document.querySelector('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
window.addEventListener('resize',(event)=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})

var c=canvas.getContext('2d');
var radius;
var x;
var gravity=1;
var coefrest=0.95;

var color=[
  '#234D51',
  '#9DD3D9',
  '#59C6D1',
  '#3B4F51',
  '#FF513F']


function Circle(x,y,dx,dy,radius){
      this.x=x;
      this.y=y;
      this.dy=dy;
      this.dx=dx;
      this.radius=radius;
      this.color=color[Math.floor(Math.random()*5)]
      this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color;
        c.fill();
      }

      this.update=function(){
       
             if(this.y+this.radius+this.dy>innerHeight){
               this.dy=-this.dy*coefrest;
             }
              
             else{
               this.dy+=gravity;
             }
             if(this.x+this.radius+this.dx>innerWidth||this.x-this.radius<=0){
              this.dx=-this.dx;
            }
           this.y+=this.dy;
           this.x+=this.dx;
           this.draw()
      }
    }
var circleArray=[]

init();

function init(){
  
  circleArray=[]
  
  for(var i=0;i<100;i++)          {                                                                                      
    radius=Math.random()*20;   
   var dx=(Math.random()-0.5)*4;
    var dy=(Math.random()-0.5)*4;
    x=Math.random()*(canvas.width-radius);
    y=Math.random()*(canvas.height-radius);
    circleArray.push(new Circle(x,y,dx,dy,radius))
  }    
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight);        
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}

animate();