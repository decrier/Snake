"use strict";

let ansi = require('ansi');
let cursor = ansi(process.stdout);

let width = 40;
let height = 20;

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

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    cursor.goto(1, 10);
    process.exit();
}

try {
    // zeichne das Spielfeld
    cursor.bg.grey();
    drawHorizontalLine(1, 1, width);
    drawHorizontalLine(1, height, width);
    drawVerticalLine(1, 1, height);
    drawVerticalLine(width, 1, height);
    cursor.bg.reset();
} catch (ex) {
    console.log(ex.toString());
} finally {
    quitGame();
}