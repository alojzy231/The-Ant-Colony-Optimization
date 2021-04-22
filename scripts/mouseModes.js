import {antColonies, maxAmountOfAntColonies,ants, trails,foodSources, maxAmountOfFoodSources, radiusOfFoodSource, radiusOfAntColony} from './app.js';
import AntColony from './antColony.js'
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
const baseMode = document.getElementById("base");

foodSourceMode.addEventListener("click", function(){
    mouseMode = "foodSource";
    console.log(mouseMode);

    foodSourceMode.className = "pressed";
    baseMode.className = "";
});

baseMode.addEventListener("click", function(){
    mouseMode = "antColony";
    console.log(mouseMode);

    baseMode.className = "pressed";
    foodSourceMode.className = "";
});


canvas.addEventListener("pointermove", function(e){
    mousePos = {
        x:e.x - boundaries.left,
        y:e.y - boundaries.top,
    }
});

canvas.addEventListener("click", function(e){
    if(mouseMode === "foodSource"){
        if(e.ctrlKey){
            for(let index = 0; index < foodSources.length; index++){
                let dst = (mousePos.x - foodSources[index].posX) * (mousePos.x - foodSources[index].posX) + (mousePos.y - foodSources[index].posY) * (mousePos.y - foodSources[index].posY);
                
                if(foodSources[index].radius * foodSources[index].radius >= dst){
                    foodSources.splice(index,1);
                }
            }
        }else{
            if(foodSources.length <= maxAmountOfFoodSources){
                foodSources.push(new FoodSource(mousePos.x, mousePos.y, radiusOfFoodSource));
            }
        }
    }else if(mouseMode === "antColony"){
        if(e.ctrlKey){
            for(let index = 0; index < antColonies.length; index++){
                let dst = (mousePos.x - antColonies[index].posX) * (mousePos.x - antColonies[index].posX) + (mousePos.y - antColonies[index].posY) * (mousePos.y - antColonies[index].posY);
                
                if(antColonies[index].radius * antColonies[index].radius >= dst){
                    
                    ants.splice(index, 1);
                    antColonies.splice(index,1);
                    trails.splice(index, 1);
                }
            }
        }else{
            if(antColonies.length <= maxAmountOfAntColonies){
                antColonies.push(new AntColony(mousePos.x, mousePos.y, radiusOfAntColony));
            }
        }
    }
});

export function brushHover(){
    if(mouseMode){
        let brushRadius = (mouseMode == "foodSource") ? radiusOfFoodSource : radiusOfAntColony;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, brushRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    
}
