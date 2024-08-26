"use strict";
let ansi = require('ansi');
let keypress = require('keypress');
let cursor = ansi(process.stdout);

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

let width = 40;
let height = 20;
let posX = 1;
let posY = 1;
let dirX = 1;
let dirY = 0;
let applePosX = 0;
let applePosY = 0;
let points = 0;
let speed = 3; // Bewegungen pro Sekunde

try {
  // Terminal bereinigen
  process.stdout.write('\x1Bc');
  // Cursor ausblenden
  process.stderr.write('\x1B[?251');

  // zeichne das Spielfeld
  cursor.bg.grey();
  drawHorizontalLine(1, 1, width);
  drawHorizontalLine(1, height, width);
  drawVerticalLine(1, 1, height);
  drawVerticalLine(width, 1, height);
  cursor.bg.reset();

  /* // cursor.bg setzt die Hintergrundfarbe
  // damit können wir mit Leerzeichen farbige Flächen malen
  cursor.bg.red();
  cursor.goto(5, 5).write(' ');
  cursor.goto(6, 5).write(' ');
  cursor.goto(7, 5).write(' ');
  // mit reset die Hintergrundfarbe zurücksetzen
  cursor.bg.reset();

  // mit cursor. setzen wir die Textfarbe
  cursor.yellow();
  cursor.goto(9, 5).write('MY GAME');
  cursor.reset();

  cursor.bg.red();
  cursor.goto(17, 5).write(' ');
  cursor.goto(18, 5).write(' ');
  cursor.goto(19, 5).write(' ');
  cursor.bg.reset(); */

  process.stdin.on('keypress', handleInput);

  posX = Math.floor(width / 2);
  posY = Math.floor(height / 2);

  // zeichne den ersten Apfel
  drawApple();

  // starte Game Loop
  gameLoop();

} catch (ex) {
  console.log(ex.toString());
  // zum Schluss Spiel beenden
  quitGame();
}

function drawApple() {
  applePosX = Math.ceil(Math.random() * (width - 2)) + 1;
  applePosY = Math.ceil(Math.random() * (height - 2)) + 1;

  cursor.bg.red();
  drawPoint(applePosX, applePosY);
  cursor.bg.reset();

  setText(1, height + 2, 'Points: ' + points.toString());
  setText(1, height + 3, 'Speed: ' + speed.toString());
}

function quitGame() {
  cursor.reset();
  cursor.bg.reset();
  // Cursor wieder einblenden
  process.stderr.write('\x1B[?25h');
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

function drawPoint(col, row) {
  cursor.goto(col, row).write(' ');
}

function removeSnake() {
  cursor.bg.black();
  drawPoint(posX, posY);
  cursor.bg.reset();
}

function drawSnake() {
  cursor.bg.green();
  drawPoint(posX, posY);
  cursor.bg.reset();
}

function setText(col, row, text) {
  cursor.goto(col, row).write(text);
}

function gameLoop() {
  // Schlange an die letzte Position verschieben
  removeSnake(posX, posY);

  // neue Position
  posX = posX + dirX;
  posY = posY + dirY;

  // Die Schlange darf die Spielbegrenzung nicht berühren
  // Prüfen ob die Schlange die Begrenzung berührt
  if (posX === 1 || posX === width || posY === 1 || posY === height) {
    // Schlange berührt Begrenzung: Spiel zu Ende
    cursor.red();
    cursor.bg.white();
    setText(width / 2 - 6, height / 2, '  GAME OVER  ');
    quitGame();
  }

  // Prüfe ob die Schlange den Apfel gefressen (berührt) hat
  if (posX === applePosX && posY === applePosY) {
    // Punkte erhöht
    points++;

    // Geschwindigkeit erhöht
    if (speed < 20) {
      speed++;
    }
    // zeichne einen neuen Apfel
    drawApple();
  }

  // die Schlange bewegen
  drawSnake();

  // rekursiver Aufruf des Game-Loops
  setTimeout(gameLoop, 1000 / speed);
}

function handleInput(evt, key) {
  if (key.name === 'q') {
    // Taste Q beendet das Spiel
    quitGame();
  } else if (key.name === 'right') {
    dirX = 1;
    dirY = 0;
  } else if (key.name === 'left') {
    dirX = -1;
    dirY = 0;
  } else if (key.name === 'up') {
    dirX = 0;
    dirY = -1;
  } else if (key.name === 'down') {
    dirX = 0;
    dirY = 1;
  }
}