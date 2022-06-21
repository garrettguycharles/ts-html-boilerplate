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

    // singleton pattern
    private constructor() {
        document.getElementById('content').appendChild(this.counterClickerButton.el);
    }

    private static instance: App;

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }
}

App.getInstance();