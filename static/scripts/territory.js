import {detailsOfTerritory} from './app.js';
import {ctx, canvas} from './canvas.js';
import SimplexNoise from './simplex-noise.js'

const simplex = new SimplexNoise();

export let territory;

export function drawTerritoryFirstTime(){
    territory = ctx.createImageData(canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const i = (x + y * canvas.width) * 4;
      let value = (simplex.noise2D(x * detailsOfTerritory, y * detailsOfTerritory));

        value = (value > 0.5) ? 255 : 74;

        territory.data[i] = value;
        territory.data[i + 1] = value;
        territory.data[i + 2] = value;
        territory.data[i + 3] = 255;
    }
  }
  ctx.putImageData(territory, 0, 0);
}

export function drawTerritory(){
    ctx.putImageData(territory, 0, 0);
}