import * as canvasModule from './canvas.js';
import {drawTerritory, drawTerritoryFirstTime} from './territory.js'
import AntColonies from './antColony.js';
import Ants from './ant.js';
import {drawTrail} from './trails.js';
import {brushHover} from './mouseModes.js'

const maxFrameRate = 45;
const minFrameRate = 1;

export const detailsOfTerritory = 0.006;

export const radiusOfAntColony = 15;
export const radiusOfFoodSource = 10;

export const maxAmountOfAntColonies = 1;
export let antColonies = [];

export const numberOfAntsPerColony = 100;
export let ants = [];

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

    drawTerritoryFirstTime();
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
    drawTerritory();

    for(let indexOfBase = 0; indexOfBase < trails.length; indexOfBase++){
        for(let index = 0; index < trails[indexOfBase].length; index++){
            drawTrail(trails[indexOfBase][index].posX, trails[indexOfBase][index].posY, sizeOfTrail, trails[indexOfBase][index].carryingFood);
        } 
    }

    for(let indexOfBase = 0; indexOfBase < ants.length; indexOfBase++){
        for(let index = 0; index < ants[indexOfBase].length; index++){
            ants[indexOfBase][index].draw();
        } 
    }

    for(let index = 0; index < foodSources.length; index++){
        foodSources[index].draw();
    }

    for(let index = 0; index < antColonies.length; index++){
        antColonies[index].draw();
    }

    brushHover();
}


