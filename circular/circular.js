var cnv=document.querySelector('canvas');
cnv.width=window.innerWidth;
cnv.height=window.innerHeight;

var c=cnv.getContext('2d');

window.addEventListener('resize',()=>{
    cnv.width=window.innerWidth;
    cnv.height=window.innerHeight;
    init();
})

var mouse={
    x:innerWidth/2,
    y:innerHeight/2,//hello1
}

window.addEventListener('mousemove',(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
})

color=[
    '#00bdff',
    '#4d39ce',
    '#088eff'
]

function Particle(x,y,radius,color){
    
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.radian=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.distcent=Math.floor(Math.random()*(130)+50);
    this.lastMouse={ x:x, y:y}
    this.draw=function(lastPoint){
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();

    };

    this.update=function(){
        const lastPoint = {
            x:this.x,
            y:this.y,
        }

        //move pointer
        this.radian+=this.velocity;

        //Drag effect
        this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
        this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;


        this.x=this.lastMouse.x+Math.cos(this.radian)*this.distcent;
        //console.log(Math.cos(this.radian))
        this.y=this.lastMouse.y+Math.sin(this.radian)*this.distcent;
        this.draw(lastPoint);
    }
}

let particle;
function init(){ 
    particle=[];

    for(let i=0; i<50;i++){
        const colour=color[Math.floor(Math.random()*4)]
        const radius=(Math.random()*2)+1;
        particle.push(new Particle(mouse.x,mouse.y,radius,colour))
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle='rgba(255,255,255,0.05)';
    c.fillRect(0,0,innerWidth,innerHeight)
    particle.forEach(particle => {
    particle.update();        
    });
}

init();
animate();

