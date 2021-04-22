import {ctx} from './canvas.js';
import {ants, numberOfAntsPerColony, trails} from './app.js';
import Ant from './ant.js'

export default class AntColony{
    constructor(x, y, radius){
        this.posX = x;
        this.posY = y;
        this.radius = radius
        this.color = "blue";
        ants.push([]);
        trails.push([]);
        for(let index = 0; index < numberOfAntsPerColony; index++){
            ants[ants.length - 1].push(new Ant(this.posX,this.posY,this.radius, ants.length - 1));
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};