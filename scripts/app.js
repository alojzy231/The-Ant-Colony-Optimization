import * as canvasModule from './canvas.js';
import {drawTerritory, drawTerritoryFirstTime} from './territory.js'
import {drawTrail} from './trail.js';
import {brushHover} from './mouseModes.js'
import Ant from './ant.js';

export const detailsOfTerritory = 0.0008;

export const radiusOfAntColony = 25;
export const radiusOfFoodSource = 20;

export const maxAmountOfAntColonies = 1;
export let antColonies = [];

export let numberOfAntsPerColony;
export let ants = [];

export let trails = [];
export const maxAmountOfTrails = 7;
const sizeOfTrail = 2;

export const maxAmountOfFoodSources = 2;
export let foodSources = [];

const frameRateNumberInput = document.getElementById('framerate-number'); 
const frameRateRangeInput = document.getElementById('framerate-range'); 

let frameRate = frameRateNumberInput.value;
numberOfAntsPerColony = 200;

let interval = setInterval(DRAW,1000 / frameRate);

(function(){
    console.log("start");

    canvasModule.start();

    drawTerritoryFirstTime();
})();

frameRateRangeInput.addEventListener("change", function(){
    frameRateNumberInput.value = frameRateRangeInput.value;
    
    frameRate = frameRateRangeInput.value;
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
            ants[indexOfBase][index].draw(indexOfBase);
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


