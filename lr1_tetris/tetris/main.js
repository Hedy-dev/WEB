"use strict"
const root = document.querySelector('#root');
const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const contr = new Controll(game, view);

window.game = game;
window.view = view;
window.controller = contr;



