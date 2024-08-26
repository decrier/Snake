"use strict";

let ansi = require('ansi');
let cursor = ansi(process.stdout);

try {
    //cursor.bg setzt die Hintergrundfarbe
    // damit können wir mit Leerzeichen farbige Flächen malen
    cursor.bg.red();
    cursor.goto(5,5).write(' ');
    cursor.goto(6,5).write(' ');
    cursor.goto(7,5).write(' ');
    // mit reset die Hintergrundfarbe zurücksetzen
    cursor.bg.reset();

    // mit cursor. setzen wir die Textfarbe
    cursor.yellow();
    cursor.goto(9, 5).write('MY GAME');
    cursor.reset();

    cursor.bg.red();
    cursor.goto(17,5).write(' ');
    cursor.goto(18,5).write(' ');
    cursor.goto(19,5).write(' ');
    cursor.bg.reset();
} catch(ex) {
    console.log(ex.toString());    
} finally {
    // zum Schluss Spiel beenden
    quitGame();
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    cursor.goto(1, 10);
    process.exit();
}
function drawHorizontalLine(col, row, length) {
    for (let i = 0; i < length; i++) {
        cursor.goto(col + i, row).write(' ');        
    }
}

function drawVerticalLine(col, row, length) {
    for (let i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');        
    }
}