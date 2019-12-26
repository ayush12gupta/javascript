var canvas=document.querySelector('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})


//Distance
function getDistance(x2,x1,y1,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;   
    
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2))
}


var mouse={
    x:undefined,
    y:undefined,
}

window.addEventListener('mousemove',(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
})
var radius;

 var x;
 var y;
 var color;
var c=canvas.getContext('2d');

//Object of Circle
function Particle(x,y,radius,color){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity={
        x:Math.random()-0.5,
        y:Math.random()-0.5,
    }
    this.draw=function(){   
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle=this.color;
        c.stroke()
        c.closePath()
    }

    this.update=function(particles){
        this.draw();
        
        for (let i = 0; i < particles.length; i++) {
            if(this===particle[i])  {console.log('hello');continue;}
            if(getDistance(this.x,particles[i].x,this.y,particles[i].y)-2*this.radius<0){
              console.log('collided');
              
            }
        }
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
    }
}


//Implementation
let particles;

function init(){
    particles=[]
    radius = 100;
    for(let i=0; i<5; i++){

          x = (Math.random() * (canvas.width-2*radius +1) + radius );
          y = (Math.random() * (canvas.height-2*radius +1) + radius );
         color= 'blue';

        if(i !== 0){
             for(let j=0; j<particles.length; j++){
                 if(getDistance(x,particles[j].x,y,particles[j].y)-2*radius<0){
                     x = (Math.random() * (canvas.width-2*radius +1) + radius );
                     y = (Math.random() * (canvas.height-2*radius +1) + radius ); 
                    j=-1;
                }
             }
        }

        particles.push(new Particle(x,y,radius,color))
    }  
    console.log(particles)
}
//console.log(particles)  

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height)
    particles.forEach(particles => {
        particles.update(particles)
    });
}
init();
animate();