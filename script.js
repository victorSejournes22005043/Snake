let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const canvasWidth = 900;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.background = "#a5d34d";

//génère le terrain jeu en fonction des dimensions du canvas
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

//dessine le terrain de jeu sur le canvas
function draw(field){
    for(var i = 0; i<field.length; ++i){
        for(var j = 0; j<field[i].length; ++j){
            switch (field[i][j]){
                case 0:
                    context.fillStyle = "#a5d34d";
                    context.fillRect(j*(canvasWidth/field[i].length), i*(canvasHeight/field.length), canvasWidth/field[i].length, canvasHeight/field.length);
                    break;
                case 1:
                    context.fillStyle = "#009600";
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

//place une pomme sur le terrain de jeu de magnère aléatoire mais pas sur le snake
function placeApple(field){
    var appleX = Math.floor(Math.random() * (field.length-2));
    var appleY = Math.floor(Math.random() * (field[1].length-2));

    if(field[appleX][appleY] == 0){
        field[appleX][appleY] = 3;
    }else{
        placeApple(field);
    }
}

function update(){
    switch(direction){
        case "UP":
            var nextCoordes = field[coords[coords.length-1][0]-1][coords[coords.length-1][1]];
            if(nextCoordes == 1 || nextCoordes == 2){
                alert("game over");
            }
            coords.push([coords[coords.length-1][0]-1, coords[coords.length-1][1]]);
            field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
            field[coords[0][0]][coords[0][1]] = 0;
            coords.shift();
            break;
        case "DOWN":
            if(field[coords[coords.length-1][0]+1][coords[coords.length-1][1]] == 1){
                alert("game over");
            }
            coords.push([coords[coords.length-1][0]+1, coords[coords.length-1][1]]);
            field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
            field[coords[0][0]][coords[0][1]] = 0;
            coords.shift();
            break;
        case "LEFT":
            if(field[coords[coords.length-1][0]][coords[coords.length-1][1]-1] == 1){
                alert("game over");
            }
            coords.push([coords[coords.length-1][0], coords[coords.length-1][1]-1]);
            field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
            field[coords[0][0]][coords[0][1]] = 0;
            coords.shift();
            break;
        case "RIGHT":
            if(field[coords[coords.length-1][0]][coords[coords.length-1][1]+1] == 1){
                alert("game over");
            }
            coords.push([coords[coords.length-1][0], coords[coords.length-1][1]+1]);
            field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
            field[coords[0][0]][coords[0][1]] = 0;
            coords.shift();
            break;
    }
    draw(field);
}

//-------------------------------
//            MAIN

var coords = [[17,15],[16,15],[15,15]]
var direction = "UP";

var field = [];
generateField();

placeApple(field);

draw(field);

setInterval(update, 500);
//-------------------------------

