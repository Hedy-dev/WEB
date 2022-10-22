//"use strict"
class Game {
    score = 0;
    last_score = 0;
    points = {
        '1' : 10,
        '2' : 15,
        '3' : 20,
        '4' : 30,
        '5' : 40,
        '6' : 45

    }
    get level() {
        return Math.floor(this.lines * 0.1);

    }
    lines = 0;
    height = 20;
    width = 10;
    field = this.create_field();
    tape_out = false;
    active_figure = this.create_figure();
    next_figure = this.create_figure();
    create_figure() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {};
        switch (type) {
            case 'I':
                piece.block = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'J':
                piece.block = [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 1]
                ];
                break;
            case 'L':
                piece.block = [
                    [0, 0, 0],
                    [1, 1, 1],
                    [1, 0, 0]
                ];
                break;
            case 'O':
                piece.block = [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'S':
                piece.block = [
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 1, 0]
                ];
                break;
            case 'T':
                piece.block = [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ];
                break;
            case 'Z':
                piece.block = [
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 1]
                ];
                break;
            default:
                throw new Error('undefined type');
        }
        piece.x = Math.floor((10 - piece.block[0].length) / 2);
        piece.y = -1;
        return piece;
    }

    move_active_figure_right() {
        const {x, y} = this.active_figure;
        if (this.correct_placing(0,1)) {
            this.active_figure.x += 1;
        }

    };

    move_active_figure_left() {
        const {x, y} = this.active_figure;
        if (this.correct_placing(0, - 1)) {
            this.active_figure.x -= 1;
        }
    };

    move_active_figure_up() {
        const {x, y} = this.active_figure;
        if (this.correct_placing(- 1, 0)) {
            this.active_figure.y -= 1;
        }
    };

    move_active_figure_down() {
        if (this.tape_out) return;
        const {x, y} = this.active_figure;
        if (this.correct_placing( 1, 0)) {
            this.active_figure.y += 1;
        } else {
            this.placing_pieces_field();
            const cl_lines = this.clear_lines();
            this.up_score(cl_lines);
            this.update_pieces();
            if (!(this.correct_placing(1, 0))) {
                this.tape_out = true;
            }
        }

    };
    correct_placing(shift_y, shift_x) {
        const {x: last_x, y: last_y, block} = this.active_figure;
        for (let y = 0; y < block.length; y++) {
            for (let x = 0; x < block[y].length; x++) {
                if (block[y][x] && (((last_y + y + shift_y) >= this.field.length) || ((last_y + y + shift_y) < -1) || ((last_x + x + shift_x) >= this.field[0].length ) || ((last_x + x + shift_x) < 0 ))) {
                    return false;
                } else {

                     if (block[y][x] && (this.field[last_y + y + shift_y][last_x + x + shift_x])) {
                         return false;
                     }
                }
            }
        }
        return true;
    };

    placing_pieces_field() {
        const block = this.active_figure.block;
        for (let y = 0; y < block.length; y++) {
            for (let x = 0; x < block[y].length; x++) {
                if (block[y][x]) {
                    this.field[this.active_figure.y + y][this.active_figure.x + x] = this.active_figure.block[y][x];
                }
            }
        }
    };

    rotate_piece() {
        const block = this.active_figure.block;
        const length = block.length;

        const rotate_block = [];
        for (let i = 0; i < length; i++) {
            rotate_block[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                rotate_block[x][y] = block[length - 1 - y][x];
            }
        }
        this.active_figure.block = rotate_block;
        if (!this.correct_placing(0, 0)) {
            this.active_figure.block = block;
        }
    }

    get_state() {
        const field = this.create_field();
        const {y: piece_y, x: piece_x, block} = this.active_figure;
        for (let y = 0; y < this.field.length; y++) {
            field[y] = [];

            for (let x = 0; x < this.field[y].length; x++) {
                field[y][x] = this.field[y][x];
            }
        }
        //сделать проверку
        for (let y = 0; y < this.active_figure.block.length; y++) {
            for (let x = 0; x < this.active_figure.block[y].length; x++) {
                if (this.active_figure.block[y][x]) {
                    field[piece_y + y][piece_x + x] = this.active_figure.block[y][x];
                }
            }
        }

        return {
            score: this.score,
            last_score: this.last_score,
            level: this.level,
            lines: this.lines,
            next_figure: this.next_figure,
            field,
            game_over: this.tape_out
        };
    }

    create_field() {
        const field = [];
        for (let y = 0; y < 20; y++) {
            field[y] = [];

            for (let x = 0; x < 10; x++) {
                field[y][x] = 0;
            }
        }
        return field;
    }

    update_pieces() {
        this.active_figure = this.next_figure;
        this.next_figure = this.create_figure();
    }

    clear_lines() {
        const rows = 20;
        const columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let num_blok = 0;
            for (let x = 0; x < columns; x++) {
                if (this.field[y][x]) {
                    num_blok += 1;
                }
            }
            if (num_blok === 0) {
                break;
            } else if (num_blok < columns) {
                continue;
            } else {
                lines.unshift(y);
            }
        }

        for (let index of lines) {

            this.field.splice(index, 1);
            this.field.unshift(new Array(columns).fill(0));
        }
        return lines.length;
    }

    up_score(clear_row) {
        if (clear_row > 0) {
            this.last_score = this.score;
            this.score += this.points[clear_row] * (this.level + 1);

            this.lines += this.clear_lines();
            console.log(this.score);
        }
    }
};

