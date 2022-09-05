const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let shapeArray;
const imgsrcArray = [document.getElementById("bg-img1"),document.getElementById("bg-img2"),document.getElementById("bg-img3"),document.getElementById("bg-img4"),document.getElementById("bg-img5"),document.getElementById("bg-img6"),document.getElementById("bg-img7"),document.getElementById("bg-img8"),document.getElementById("bg-img9")]; //Images/Vector Smart Object 10.png
function Shape1(imgIndex,x,y,directionX,directionY,size,imgAngle,imgRotRate){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.imgIndex = imgIndex;
    this.imgAngle = imgAngle
    this.imgRotRate = imgRotRate;
}

Shape1.prototype.draw = function(){
    ctx.beginPath();
    ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    ctx.translate((this.x + this.size/2), (this.y + this.size/2));
    ctx.rotate(Math.PI / 180 * (this.imgAngle += this.imgRotRate));
    ctx.translate(-(this.x + this.size/2), -(this.y + this.size/2));
    ctx.drawImage(imgsrcArray[this.imgIndex], this.x,this.y,this.size,this.size);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

Shape1.prototype.update = function(){
    if(this.x - this.size - 20 > canvas.width || this.x + this.size + 20 < 0){
        this.directionX = -this.directionX;
    }
    if(this.y + this.size - 20 > canvas.width || this.y + this.size + 20 < 0){
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}

function init(){
    shapeArray = [];
    for (let i = 0;i<40;i++){
        let size = (Math.random() * 20) + 50;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let imgIndex = Math.floor((Math.random() * 9));
        let imgRotRate = Math.random() * 1;
        let imgAngle = Math.floor((Math.random() * 360));
        if (imgIndex > 6){
            size += ((Math.random() * 100) + 20);
        }
        shapeArray.push(new Shape1(imgIndex,x,y,directionX,directionY,size,imgAngle, imgRotRate));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for (let i =0; i<shapeArray.length;i++){
        shapeArray[i].update();
    }
}
init();
animate();