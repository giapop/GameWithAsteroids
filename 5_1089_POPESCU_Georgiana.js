//proprietati canavas
const canvas=document.getElementById("id_canvas");
const context=canvas.getContext("2d");
const width=canvas.width;
const height=canvas.height;

var punctaj=0;
const scor=document.getElementById("id_scor");
const numarVieti=document.getElementById("id_nrVieti");
var nrVieti=5;
numarVieti.innerText="Număr vieți: "+nrVieti;
punctaj=100;
scor.innerText="SCOR: "+punctaj;
var nava,count=0,vectorScoruri=[], nume=[];


const btnPlay=document.getElementById("id_btnPlay");
btnPlay.addEventListener("click",()=>{
    nava=new drawNava(90,30,120,60);
    //window.addEventListener('keydown',getKeyandMove);
    drawAsteroids();

    count++;
    punctaj+=count;
    scor.innerText="SCOR: "+punctaj;
  
    setInterval(move,10)

    const numeInput=document.getElementById("id_nume");
    nume.push(numeInput.value);
    console.log(nume);
});



function adaugaInTabel(valoare){
    const tbody = document.getElementById("tbody");

    const linieNouaTabel = document.createElement("tr");

    const Valoare = document.createElement("td");
    Valoare.innerText ="-> "+valoare;
    linieNouaTabel.append(Valoare);

    tbody.append(linieNouaTabel);
}
adaugaInTabel("maria 10100");
const btnRestart=document.getElementById("id_btnRestart");
btnRestart.addEventListener("click",()=>{
    
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle="bisque"
    context.fillRect(0,0,width,height); 
    console.log(punctaj);
    vectorScoruri.push(punctaj);

    for (var i = 0; i < vectorScoruri.length; i++){
                for (var j = i+1; j <vectorScoruri.length; j++){
                        if (vectorScoruri[i] < vectorScoruri[j]){
                                var aux=vectorScoruri[i];
                                vectorScoruri[i]=vectorScoruri[j];
                                vectorScoruri[j]=aux;
                        }
                }
        }
    
    numarVieti.innerText="Număr vieți: "+nrVieti;

    //stocare primele cele mai bune 5 scoruri
    var stocat=[];
    if(vectorScoruri.length<5)
   {
     for (var i = 0; i < vectorScoruri.length; i++){
       
        stocat.push(vectorScoruri[i]+" "+nume[i])
       }
    }
    else{
        for (var i = 0; i < 5; i++){
       
            stocat.push(vectorScoruri[i]+" "+nume[i])
           }
    }
    localStorage.setItem("nrScoruri5",stocat);
   
  
    //restart punctaj
    punctaj=100;
    scor.innerText="SCOR: "+punctaj;
    //numeInput.innerText="";


})


const btnScoruri=document.getElementById("id_btnScoruri");
btnScoruri.addEventListener("click",()=>{
    var tabel=document.getElementById("id_tabel");
  
   var result = localStorage.getItem("nrScoruri5");
   // console.log(result);
    var resultSplituit=result.split(",");
    console.log(resultSplituit.length);

    for(var k=0;k<resultSplituit.length;k++){
        adaugaInTabel(resultSplituit[k]);
       
    }
   
})



function getKeyandMove(e){
    var code_key=e.keyCode;
    
    if(code_key==37)
    {    context.clearRect(0,0,canvas.width,canvas.height);
        moveLeft();
        move();
      
    }
    if(code_key==39)
    {context.clearRect(0,0,canvas.width,canvas.height);
        moveRight();
        
    }
    if(code_key==40){
        context.clearRect(0,0,canvas.width,canvas.height);
        moveDown();
  
    }
    if(code_key==38){
        context.clearRect(0,0,canvas.width,canvas.height);
        moveUp();
      
    }
   
}
function moveLeft(){

   
    nava.x += -nava.speedx;
    nava.startX+= -nava.speedy;
   
    context.moveTo(nava.startX, nava.startY)
    context.lineTo(nava.startX, nava.y)
    context.lineTo(nava.x, nava.y)
    context.lineTo(nava.startX, nava.startY)
    context.stroke()
    context.closePath()

}
function moveRight(){

    nava.x += nava.speedx;
    nava.startX+= nava.speedy;
    context.clearRect(0,0,canvas.width,canvas.height);
        
    context.moveTo(nava.startX, nava.startY)
    context.lineTo(nava.startX, nava.y)
    context.lineTo(nava.x, nava.y)
    context.lineTo(nava.startX, nava.startY)
    context.stroke()
    context.closePath()
}
function moveUp(){

    nava.y += -nava.speedx;
    nava.startY+= -nava.speedy;
    context.clearRect(0,0,canvas.width,canvas.height);
        
    context.moveTo(nava.startX, nava.startY)
    context.lineTo(nava.startX, nava.y)
    context.lineTo(nava.x, nava.y)
    context.lineTo(nava.startX, nava.startY)
    context.stroke()
    context.closePath()
}
function moveDown(){

    nava.y += nava.speedx;
    nava.startY += nava.speedy;
    context.clearRect(0,0,canvas.width,canvas.height);
        
    context.moveTo(nava.startX, nava.startY)
    context.lineTo(nava.startX, nava.y)
    context.lineTo(nava.x, nava.y)
    context.lineTo(nava.startX, nava.startY)
    context.stroke()
    context.closePath()

}



function drawNava(x,y,startX,startY){
    //context.clearRect(0,0,canvas.width,canvas.height);
    console.log("hello");
    this.x=x;
    this.y=y;
    this.startX=startX;
    this.startY=startY;

    this.speedx=30;
    this.speedy=30;

    
    context.moveTo(startX, startY)
    context.lineTo(startX, this.y)
    context.lineTo(this.x, this.y)
    context.lineTo(startX, startY)
    context.stroke()
    context.closePath()
    this.moveleft=function(){
        this.x += -this.speedx;
        this.startX+= -this.speedy;
    }
}



function drawAsteroid(x,y,r,cul,nrRachete,dx,dy){ 

    this.x=x;
    this.y=y;
    this.cul=cul;
    this.r=r;
    this.nrRachete=nrRachete;
    this.dx=dx;
    this.dy=dy;
   
  //forma
    context.beginPath();
    context.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    context.moveTo(this.x,this.y);
 //culoare
    context.fillStyle=`hsl(${this.cul}, 100%, 50%)`;
    context.fill();
    context.stroke();
//text
    const text=nrRachete;
    const text_x=this.x+text*Math.cos(Math.PI);
    const text_y=this.y+text*Math.sin(Math.PI);
    context.fillStyle="black";
    context.font = "20px casual";
    context.fillText(text,text_x,text_y);
   
    this.moveBalls = function() {
		if(this.x +this.r>860||this.x-this.r<0){
			this.dx=-this.dx;
		}
		if(this.y+this.r>600||this.y-this.r<0) {
			this.dy = -this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;

        context.beginPath();
        context.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        context.moveTo(this.x,this.y);

        context.fillStyle=`hsl(${this.cul}, 100%, 50%)`;
        context.fill();
        context.stroke();
    
        const text=nrRachete;
        const text_x=this.x+text*Math.cos(Math.PI);
        const text_y=this.y+text*Math.sin(Math.PI);
        context.fillStyle="black";
        context.font = "20px casual";
        context.fillText(text,text_x,text_y);
    
	}
    

}
var circles=[];
function drawAsteroids(){
    
    for(var i=0;i<5;i++){
        //desenare Asteroid
        const mininInterval=1;
        const maximInterval=4;
        let nrRacheteNecesare=Math.floor(Math.random()*(maximInterval-mininInterval+1)+mininInterval);
        console.log(nrRacheteNecesare);
       //cerc
       let cx= 100*nrRacheteNecesare;
       let cy=100*nrRacheteNecesare+7;
       let raza=nrRacheteNecesare*i+20;
    
       //cu cat mutam bila
       const min=1;
       const max=5;
       let someVar=Math.floor(Math.random()*(max-min+1)+min);
       console.log(someVar)
       let dx=someVar;
       let dy=someVar;
    
       //culoare random
       let culoare=360*nrRacheteNecesare/15;
    
      circles.push(new drawAsteroid(cx,cy,raza,culoare,nrRacheteNecesare,dx,dy));
    
    }
}



function move(){
    //mutareBila
   //requestAnimationFrame(move);
    //context.clearRect(0,0,canvas.width,canvas.height); 
    context.fillStyle="bisque"
    context.fillRect(0,0,width,height);
    for(var c=0;c<5;c++){
           circles[c].moveBalls();
        //    for(d=0;d<5;d++){
        //     if(c!=d){
        //         if(getDistance(circles[c].x,circles[c].y,circles[d].x,circles[d].y)<circles[c].r+circles[d].r){
        //             circles[c].dx=-circles[c].dx;
        //             circles[c].dy=-circles[c].dy;
        //         }
        //         circles[c].x+=circles[c].dx;
        //         circles[c].y+=circles[c].dy;
        //     }
          
        //    }

    }
  
  
     drawNava(90,30,120,60);
}

function getDistance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistanve=y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistanve,2))
}
