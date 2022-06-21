import {ClickerButton} from "./ClickerButton";

export class App {
    private _counter = 0;
    private counterDisplaySpan = document.getElementById('counter');

    get counter(): number {
        return this._counter;
    }

    set counter(value: number) {
        this._counter = value;
        this.counterDisplaySpan.innerText = String(this._counter);
    }

    private counterClickerButton = new ClickerButton();

    // TODO: implement singleton pattern
    constructor() {
        document.getElementById('content').appendChild(this.counterClickerButton.el);
    }
}

const app = new App();