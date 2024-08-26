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