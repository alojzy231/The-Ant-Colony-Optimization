import {ctx} from './canvas.js';

export default class FoodSource{
    constructor(x,y){
        this.posX = x;
        this.posY = y;
        this.radius = 15;
        this.color = "green";
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};