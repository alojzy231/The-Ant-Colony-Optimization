export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export let base;

export function start(){
    canvas.width = 0.95 * window.innerWidth;
    canvas.height = 0.9 * window.innerHeight;

    base = {
        posX: canvas.width/2,
        posY: canvas.height/2,
        radius: 25,
        color: 'blue',
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
}

export function drawCanvas(){
    ctx.clearRect(0 ,0, canvas.width, canvas.height);
    ctx.fillStyle = "#4A4A4F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
