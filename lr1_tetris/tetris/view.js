"use strict"
class View {
    constructor(piece, width, height, rows, columns) {
        this.element = piece;
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas_panel = document.createElement('canvas');
        this.canvas_panel.id = "panel"
        this.canvas.id = "main"
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas_panel.width = 200
        this.canvas_panel.height = 100
        this.canvas_panel.style.left = "0%";
        this.canvas_panel.style.top = "8%";
        this.canvas_panel.style.position = "absolute";
        this.context = this.canvas.getContext('2d');
        this.context_panel = this.canvas_panel.getContext('2d');
        this.block_width = this.width / columns;
        this.block_height = this.height / rows;
        this.element.appendChild(this.canvas);
        this.element.appendChild(this.canvas_panel);
    }

    render(state) {
        this.clear_screen();
        this.render_field(state.field);
        this.render_panel(state);

    }

    clear_screen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    render_field(field) {
        for (let y = 0; y < field.length; y++) {
            const line = field[y];
            for (let x = 0; x < line.length; x++) {
                const element = line[x];

                if (element) {
                    this.render_block(x * this.block_width, y * this.block_height, this.block_width, this.block_height, this.context);
                }
            }
        }
    }

    render_panel({score, level, lines, next_figure}) {
        this.context_panel.clearRect(0, 0, this.width, this.height);
        document.getElementById("score").innerText = score;
        document.getElementById("level").innerText = level;
        document.getElementById("lines").innerText = lines;

/*        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px';
        this.context.fillText(`score: ${score}`, 0, 0);
        this.context.fillText(`level: ${level}`, 0, 24);
        this.context.fillText(`lines: ${lines}`, 0, 48);*/
        //this.context.fillText(`next_figure: ${next_figure}`, 0, );
        for (let y = 0; y < next_figure.block.length; y++) {
            for (let x = 0; x < next_figure.block[y].length; x++) {
                if (next_figure.block[y][x]) {
                    this.render_block(x * this.block_width, y * this.block_height, this.block_width, this.block_height, this.context_panel);
                }

            }
        }
    }

    detect_color() {
        const index = Math.floor(Math.random() * 7);
        let color = ""
        switch (index) {
            case 0:
                color = "rgba(96,101,100,0.78)";
                break;
            case 1:
                color = "rgba(45,47,47,0.63)";
                break;
            case 2:
                color = "rgba(198,203,203,0.78)";
                break;
            case 3:
                color = "rgba(83,94,94,0.54)";
                break;
            case 4:
                color = "rgba(118,121,124,0.87)";
                break;
            case 5:
                color = "rgba(198,203,203,0.78)";
                break;
            case 6:
                color = "rgba(18,21,21,0.78)";
                break;
        }
        return color;
    }
    render_block(x, y, block_width, block_height, context) {
        context.fillStyle  = this.detect_color();
        context.strokeStyle = "rgba(12,0,0,0.8)"
        context.strokeRect(x, y, block_width, block_height);
        context.fillRect(x, y, block_width, block_height);

    }
}