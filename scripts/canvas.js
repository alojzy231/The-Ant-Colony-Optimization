export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function start(){
    canvas.width = 0.95 * window.innerWidth;
    canvas.height = 0.9 * window.innerHeight;
}