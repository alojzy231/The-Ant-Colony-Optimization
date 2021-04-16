import * as canvasModule from './canvas.js';
import Ants from './ant.js';
import {drawTrail} from './trails.js';
import {brushHover} from './mouseModes.js'

const maxFrameRate = 45;
const minFrameRate = 1;

export const numberOfAnts = 400;
let ants = [];

export let trails = [];
export const maxAmountOfTrails = 7;
const sizeOfTrail = 2;

export const maxAmountOfFoodSources = 2;
export let foodSources = [];

const frameRateNumberInput = document.getElementById('framerate-number'); 
const frameRateRangeInput = document.getElementById('framerate-range'); 

let frameRate = frameRateNumberInput.value;

let interval = setInterval(DRAW,1000 / frameRate);

(function(){
    console.log("start");
    frameRateRangeInput.max = maxFrameRate;
    frameRateRangeInput.min = minFrameRate;

    canvasModule.start();

    for(let index = 0; index < numberOfAnts; index++){
        ants.push(new Ants(canvasModule.base.posX, canvasModule.base.posY, canvasModule.base.radius));
    }
})();

frameRateNumberInput.addEventListener("change", function(){
    let val = frameRateNumberInput.value;
    
    if(val > maxFrameRate){
        val = maxFrameRate;
        frameRateNumberInput.value = maxFrameRate;
    }else if(val < minFrameRate){
        val = minFrameRate;
        frameRateNumberInput.value = minFrameRate;
    }
    frameRateRangeInput.value=val;
    
    frameRate = frameRateNumberInput.value;
    clearInterval(interval);
    interval = setInterval(DRAW,1000 / frameRate);
});

frameRateRangeInput.addEventListener("change", function(){
    let val = frameRateRangeInput.value;

    frameRateNumberInput.value=val;
    
    frameRate = frameRateNumberInput.value;
    clearInterval(interval);
    interval = setInterval(DRAW,1000 / frameRate);
});

function DRAW(){
    canvasModule.drawCanvas(); 

    for(let index = 0; index < trails.length; index++){
        drawTrail(trails[index].posX, trails[index].posY, sizeOfTrail, trails[index].carryingFood);
    }

    for(let index = 0; index < numberOfAnts; index++){
        ants[index].draw();
    }

    for(let index = 0; index < foodSources.length; index++){
        foodSources[index].draw();
    }

    canvasModule.base.draw(); 

    brushHover();
}


