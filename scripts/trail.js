import {ctx} from './canvas.js'

export function drawTrail(x, y, size, food){
    if(food){
        ctx.fillStyle = "green";
    }else{
        ctx.fillStyle = "red";
    }
    
    // ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, size, size);
    // ctx.globalAlpha = 1.0;
}