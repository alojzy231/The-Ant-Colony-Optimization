import {foodSources, maxAmountOfFoodSources} from './app.js';
import FoodSource from './foodSource.js';
import {ctx} from './canvas.js';

export let mouseMode = "none";

let mousePos = {
    x: 0,
    y: 0,
}

const canvas = document.getElementById("canvas");
let boundaries = canvas.getBoundingClientRect();

const foodSourceMode = document.getElementById("food-source");
const drawObstaclesMode = document.getElementById("draw-obstacles");

const brushSize = 20;
const brushLineWidth = 5;

foodSourceMode.addEventListener("click", function(){
    mouseMode = "foodSource";
    console.log(mouseMode);

    foodSourceMode.className = "pressed";
    drawObstaclesMode.className = "";
});

drawObstaclesMode.addEventListener("click", function(){
    mouseMode = "drawObstacles";
    console.log(mouseMode);

    drawObstaclesMode.className = "pressed";
    foodSourceMode.className = "";
});


canvas.addEventListener("pointermove", function(e){
    mousePos = {
        x:e.x - boundaries.left,
        y:e.y - boundaries.top,
    }
});

canvas.addEventListener("click", function(e){
    if(mouseMode == "foodSource"){
        if(e.ctrlKey){
            for(let index = 0; index < foodSources.length; index++){
                let dst = (mousePos.x - foodSources[index].posX) * (mousePos.x - foodSources[index].posX) + (mousePos.y - foodSources[index].posY) * (mousePos.y - foodSources[index].posY);
                
                if(foodSources[index].radius * foodSources[index].radius >= dst){
                    foodSources.splice(index,1);
                }
            }
        }else{
            if(foodSources.length <= maxAmountOfFoodSources){
                foodSources.push(new FoodSource(mousePos.x, mousePos.y));
            }
        }
    }
});

export function brushHover(){
    if(mouseMode == "drawObstacles"){
        ctx.lineWidth = brushLineWidth;
        ctx.strokeStyle = "white";
        ctx.strokeRect(mousePos.x - brushSize / 2, mousePos.y - brushSize / 2, brushSize, brushSize)
    }
    
}
