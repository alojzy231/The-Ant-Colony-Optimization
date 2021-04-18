import {canvas, ctx, base} from './canvas.js'
import {foodSources, trails, maxAmountOfTrails, numberOfAnts} from './app.js';

export default class Ant{
    
    constructor(baseX, baseY, radius){
        this.size = 5;
        this.posX = Math.cos(Math.random()*Math.PI*2)*radius + baseX;
        this.posY = Math.sin(Math.random()*Math.PI*2)*radius + baseY;
        this.dir = this.normalize(Math.random() - 0.5, Math.random() - 0.5);
        this.speed = 5;

        this.carryingFood = false;
        this.busy = false;
        this.countingMoves = 0;
        this.movesBetweenTrails = 7;

        this.angleOfView = 90;
        this.fieldOfView = 100;
        this.seeingTrailDst = 150;

        this.angleWhenFoundTrailOffset = 100;
        this.angleWhenLookingForTrailOffset = 100;
        this.currentAngleOffset = this.angleWhenLookingForTrailOffset;
        

        this.canBounce = true;
    }

    normalize(_x,_y){
        let r = Math.sqrt(_x * _x + _y * _y);
    
        return {
            x: _x/r,
            y: _y/r,
        };
    }

    randomAngle(x,y,extreme){
        let angle = (Math.floor(Math.random() * extreme) - extreme) * (Math.random() - 0.5);
        angle *= Math.PI/180;
        this.dir.x = Math.cos(angle) * x - Math.sin(angle) * y;
        this.dir.y = Math.sin(angle) * x + Math.cos(angle) * y;
    }

    draw(){
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.size, this.size);
        this.move();
    }

    distance(x1,y1,x2,y2){
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }

    move(){
        if(this.carryingFood){
            this.checkForHomePheronomes();
        }else{
            this.checkForFoodPheronomes();
        }

        this.checkForFood();
        this.checkForHome();

        this.randomAngle(this.dir.x, this.dir.y, this.currentAngleOffset);
        this.dir = this.normalize(this.dir.x, this.dir.y);
        this.posX += this.dir.x * this.speed;
        this.posY += this.dir.y * this.speed;

        if(this.posX <= 0 + this.size || this.posX >= canvas.width - this.size){
            this.dir.x *= -1;
        }

        if(this.posY <= 0 + this.size || this.posY >= canvas.height - this.size){
            this.dir.y *= -1;
        }

        if(this.countingMoves >= this.movesBetweenTrails){
            this.countingMoves = 0;
            this.makeTrail();
        }else{
            this.countingMoves++;
        }

        
    }

    withinAngle(v1, v2, angle){
        let magnitideV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        let magnitideV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        let currAngle = Math.acos((v1.x * v2.x + v1.y * v2.y) / (magnitideV1 * magnitideV2)) * (180/Math.PI);
        return currAngle <= angle;
    }

    checkForFood(){
        if(!this.carryingFood){
            for(let index = 0; index < foodSources.length; index++){
            let target = this.normalize(foodSources[index].posX - this.posX, foodSources[index].posY - this.posY);
            if(foodSources[index].radius * foodSources[index].radius >= this.distance(this.posX, this.posY,foodSources[index].posX, foodSources[index].posY) && this.canBounce){
                    this.carryingFood = true;
                    this.dir.x *= -1;
                    this.dir.y *= -1;
                    this.canBounce = false;
            }else if(foodSources[index].radius * foodSources[index].radius < this.distance(this.posX, this.posY,foodSources[index].posX, foodSources[index].posY) && !this.canBounce){
                this.canBounce = true;
                }
            }
        }
    }

    checkForHome(){
        if(this.carryingFood){
            if(base.radius * base.radius >= this.distance(base.posX, base.posY, this.posX, this.posY) && this.canBounce){
                this.carryingFood = false;
                this.dir.x *= -1;
                this.dir.y *= -1;
                this.canBounce = false;
            }else if((base.radius * base.radius < this.distance(base.posX, base.posY, this.posX, this.posY) && !this.canBounce)){
                this.canBounce = true;
            }
        }  
        
    }

    checkForFoodPheronomes(){
        if(!this.carryingFood){
            for(let index = 0; index < foodSources.length; index++){
                let target = this.normalize(foodSources[index].posX - this.posX, foodSources[index].posY - this.posY);
                if(this.fieldOfView * this.fieldOfView >= this.distance(foodSources[index].posX, foodSources[index].posY, this.posX, this.posY) && this.withinAngle(this.dir, target, this.angleOfView / 2)){
                    this.dir.x = foodSources[index].posX - this.posX;
                    this.dir.y = foodSources[index].posY - this.posY;

                    this.dir = this.normalize(this.dir.x, this.dir.y);
                    this.busy = true;
                    break;
                }
            }
            if(!this.busy){
                let countingTrails = 0;
                let averageX = 0;
                let averageY = 0;

                for(let index = 0; index < trails.length; index++){
                    let target = this.normalize(trails[index].posX - this.posX, trails[index].posY - this.posY);
                    if(trails[index].carryingFood && this.seeingTrailDst * this.seeingTrailDst >= this.distance(trails[index].posX, trails[index].posY, this.posX, this.posY) && this.withinAngle(this.dir, target, this.angleOfView / 2)){
                        countingTrails++;

                        averageX += trails[index].posX - this.posX;
                        averageY += trails[index].posY - this.posY;
                        
                        this.busy = true;
                    }
                }

                if(countingTrails > 0){
                    this.dir = this.normalize(averageX / countingTrails, averageY / countingTrails);
                }
                
            }

            if(this.busy){
                this.currentAngleOffset = this.angleWhenFoundTrailOffset;
                this.busy = false;
            }else{
                this.currentAngleOffset = this.angleWhenLookingForTrailOffset;
            }
           
        }
    }

    checkForHomePheronomes(){
        if(this.carryingFood){
            let target = this.normalize(base.posX - this.posX, base.posY - this.posY);
            if(this.fieldOfView * this.fieldOfView >= this.distance(base.posX, base.posY, this.posX, this.posY) && this.withinAngle(this.dir, target, this.angleOfView / 2)){
                this.dir.x = base.posX - this.posX;
                this.dir.y = base.posY - this.posY;

                this.dir = this.normalize(this.dir.x, this.dir.y);
                this.busy = true;
            }else if(!this.busy){
                let countingTrails = 0;
                let averageX = 0;
                let averageY = 0;
                

                for(let index = 0; index < trails.length; index++){
                    target = this.normalize(trails[index].posX - this.posX, trails[index].posY - this.posY);
                    if(!trails[index].carryingFood && this.seeingTrailDst * this.seeingTrailDst >= this.distance(trails[index].posX, trails[index].posY, this.posX, this.posY) && this.withinAngle(this.dir, target, this.angleOfView / 2)){

                        countingTrails++;

                        averageX += trails[index].posX - this.posX;
                        averageY += trails[index].posY - this.posY;
                        
                        this.busy = true;
                    }
                }

                if(countingTrails > 0){
                    this.dir = this.normalize(averageX / countingTrails, averageY / countingTrails);
                }
            }

            if(this.busy){
                this.currentAngleOffset = this.angleWhenFoundTrailOffset;
                this.busy = false;
            }else{
                this.currentAngleOffset = this.angleWhenLookingForTrailOffset;
            }
           
        }
    }

    makeTrail(){
        if(trails.length >= maxAmountOfTrails * numberOfAnts) trails.shift();
        if(!this.carryingFood){
            trails.push({
                posX: this.posX,
                posY: this.posY,
                carryingFood: false,
            })
        }else{
            trails.push({
                posX: this.posX,
                posY: this.posY,
                carryingFood: true,
            })
        }
    }
};

