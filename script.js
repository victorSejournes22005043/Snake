let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const canvasWidth = 900;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.background = "#c6c6c6";

var field = [];

function generateField(){
    for(var i = 0; i < canvasHeight/30; ++i){
        field.push([]);
        if(i == 0 || i == (canvasHeight/30)-1){
            for(var j = 0; j < canvasWidth/30; ++j){
                field[i].push(1);
            }
        }
        else {
            for(var j = 0; j < canvasWidth/30; ++j){
                if(j == 0 || j == (canvasWidth/30)-1){
                    field[i].push(1);
                }
                else{
                    field[i].push(0);
                }
            }
        }
    }
    field[17][15] = 2;
    field[16][15] = 2;
    field[15][15] = 2;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function draw(field){
    for(var i = 0; i<field.length; ++i){
        for(var j = 0; j<field[i].length; ++j){
            switch (field[i][j]){
                case 0:
                    context.fillStyle = "#c6c6c6"
                    context.fillRect(j*(canvasWidth/field[i].length), i*(canvasHeight/field.length), canvasWidth/field[i].length, canvasHeight/field.length);
                    break;
                case 1:
                    context.fillStyle = "#545454"
                    context.fillRect(j*(canvasWidth/field[i].length), i*(canvasHeight/field.length), canvasWidth/field[i].length, canvasHeight/field.length);
                    break;
                case 2:
                    context.fillStyle = "#44cdff"
                    context.fillRect(j*(canvasWidth/field[i].length), i*(canvasHeight/field.length), canvasWidth/field[i].length, canvasHeight/field.length);
                    break;
                case 3:
                    context.fillStyle = "#ff0000"
                    context.arc(j*(canvasWidth/field[i].length)+15, i*(canvasHeight/field.length)+15, (canvasWidth/field[i].length)/2, 0, Math.PI * 2, true);
                    context.fill();
                    break;
            }

        }
    }
}

function placeApple(field){
    var appleX = Math.floor(Math.random() * (field.length-2));
    var appleY = Math.floor(Math.random() * (field[1].length-2));

    if(field[appleX][appleY] == 0){
        field[appleX][appleY] = 3;
    }else{
        placeApple(field);
    }
}
generateField();

placeApple(field);

draw(field);

