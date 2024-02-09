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
                    context.beginPath();
                    context.fillStyle = "#45a5ff"
                    for(var coordsIndex = 0; coordsIndex<coords.length; ++coordsIndex){
                        if (coords[coordsIndex][0] == i && coords[coordsIndex][1] == j){
                            let colorString = `rgb(${100 - (75/coords.length)*coordsIndex}, ${200 - (75/coords.length)*coordsIndex}, 255)`;
                            context.fillStyle = colorString;
                        }
                    }
                    context.fillRect(j*(canvasWidth/field[i].length), i*(canvasHeight/field.length), canvasWidth/field[i].length, canvasHeight/field.length);
                    break;
                case 3:
                    context.beginPath();
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
    switch(realDirection){
        case "UP":
            var nextCoordesX = coords[coords.length-1][0]-1;
            var nextCoordesY = coords[coords.length-1][1];
            break;
        case "DOWN":
            var nextCoordesX = coords[coords.length-1][0]+1;
            var nextCoordesY = coords[coords.length-1][1];
            break;
        case "LEFT":
            var nextCoordesX = coords[coords.length-1][0];
            var nextCoordesY = coords[coords.length-1][1]-1;
            break;
        case "RIGHT":
            var nextCoordesX = coords[coords.length-1][0];
            var nextCoordesY = coords[coords.length-1][1]+1;
            break;
    }
    if(field[nextCoordesX][nextCoordesY] == 1 || field[nextCoordesX][nextCoordesY] == 2){
        if (score > highScore) {
            // Set the high score to the users' current points
            highScore = parseInt(score);
            // Store the high score
            localStorage.setItem('highScore', highScore);
        }
        document.getElementById("highScoreDisplay").innerText = "Highscore : " + highScore;
        alert("game over      score : " + score);
        return 0;
    }
    else if(field[nextCoordesX][nextCoordesY] == 3){
        score += 1;
        document.getElementById("scoreDisplay").innerText = "Score : " + score;
        coords.push([nextCoordesX, nextCoordesY]);
        field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
        draw(field);
        placeApple(field);
    } else {
        coords.push([nextCoordesX, nextCoordesY]);
        field[coords[coords.length-1][0]][coords[coords.length-1][1]] = 2;
        draw(field);
        field[coords[0][0]][coords[0][1]] = 0;
        coords.shift();
    }

    if (realDirection == "UP" || realDirection == "DOWN"){
        if (direction == "RIGHT"){
            realDirection = "RIGHT";
        }
        else if (direction == "LEFT"){
            realDirection = "LEFT";
        }
    }
    else if (realDirection == "LEFT" || realDirection == "RIGHT"){
        if (direction == "UP"){
            realDirection = "UP";
        }
        else if (direction == "DOWN"){
            realDirection = "DOWN";
        }
    }

    setTimeout(update, 75);
}

//-------------------------------
//            MAIN

var coords = [[17,15],[16,15],[15,15]]
var direction = "UP";
var realDirection = "UP";

document.body.addEventListener("keydown", (ev) => {
    if (direction == "UP" || direction == "DOWN"){
        if (ev.key == "ArrowRight"){
            direction = "RIGHT";
        }
        else if (ev.key == "ArrowLeft"){
            direction = "LEFT";
        }
    }
    else if (direction == "LEFT" || direction == "RIGHT"){
        if (ev.key == "ArrowUp"){
            direction = "UP";
        }
        else if (ev.key == "ArrowDown"){
            direction = "DOWN";
        }
    }
});

var field = [];
var score = 0;
var highScore = localStorage.getItem('highScore') || 0;

document.getElementById("highScoreDisplay").innerText = "Highscore : " + highScore;
generateField();

placeApple(field);

draw(field);

//setInterval(update, 100);
update();
//-------------------------------

