export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function start(){
    canvas.width = 0.94 * window.innerWidth;
    canvas.height = 0.7 * window.innerHeight;
}