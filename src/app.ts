import {Tickable} from "./utils/Tickable";

export class App {
    // singleton pattern
    private constructor() {
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