import {App} from "./app";

export class ClickerButton {
    el: HTMLButtonElement = document.createElement('button');

    constructor() {
        this.el.innerText = "Click me!";
        this.el.addEventListener('click', () => {
            // Increment the App's counter variable.
            // But how do we get a reference to the App?
            // Answer: the Singleton pattern!!

            // TODO: CODE HERE
        });
    }
}