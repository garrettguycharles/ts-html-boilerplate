import {Canvas} from "./Canvas";
import {Game} from "./Game";

export class App {

    display!: Canvas;
    game: Game;

    constructor() {
        this.display = new Canvas(document.createElement("canvas"));
        document.body.appendChild(this.display.canvas);
        this.display.width = 600;
        this.display.height = 600;

        document.body.style.padding = "1rem";
        this.display.canvas.style.border = "2px solid #ebebeb";
        this.display.canvas.style.borderRadius = "5px";

        this.game = new Game(this.display);
        this.game.start();


        // temporary - so the game doesn't just run forever while I'm coding
        const stopButton = document.createElement("button");
        stopButton.appendChild(document.createTextNode("stop"))
        document.body.appendChild(stopButton);
        stopButton.addEventListener("click", (e) => {
            this.game.stop();
        });
    }
}

const app = new App;