"use strict"

class Controll {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.time = 1000;
        //if (this.game.game_over) this.time = null;
        this.game_interval();
        document.addEventListener('keydown', this.key_down_event.bind(this));
    }
    game_interval() {
        let loop = setInterval(() => {
            this.game.move_active_figure_down();
            this.view.render(this.game.get_state());
            this.game_loop(loop);
        }, this.time);
    }
    game_loop(loop) {
        if (this.game.get_state().last_score != this.game.get_state().score) {
            this.game.get_state().last_score = this.game.get_state().score;
            this.time = 1000 - this.game.get_state().score * 4;
        }
        if (this.game.get_state().game_over) {
            this.time = null;
            clearInterval(loop);
            this.game_over();
        }
    }
    game_over() {
        let last_player = localStorage.getItem("last_player");
        if (localStorage.getItem("list_player") == null){
            localStorage.setItem("list_player", JSON.stringify([]));
        }
        let list_player = JSON.parse(localStorage.getItem("list_player"));
        console.log(list_player);
        list_player.push({name: last_player, score: this.game.score});
        localStorage.setItem("list_player", JSON.stringify(list_player));
        let form = document.createElement("form");
        form.action = "../game_info/records.html";
        let input = document.createElement("input");
        input.type = "submit";
        input.value = "next";
        input.className = "game_over";
        form.appendChild(input);
        document.getElementById("statistic").appendChild(form);
    }

    key_down_event(event) {
        switch (event.keyCode) {
            case 37: //left
                this.game.move_active_figure_left();
                this.view.render(this.game.get_state());
                break;
            case 39: //right
                this.game.move_active_figure_right();
                this.view.render(this.game.get_state());
                break;
            case 40:
                this.game.move_active_figure_down();
                this.view.render(this.game.get_state());
                break;
            case 38:
                this.game.rotate_piece();
                this.view.render(this.game.get_state());
                break;
        }
    }
}