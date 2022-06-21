export class App {
    // TODO: Replace this with a Pair class that will work with any
    //       combination of types!
    pair: {first: string, second: number} = {first: "Garrett", second: 17};

    firstDisplay = document.getElementById('pairDisplayFirst');
    secondDisplay = document.getElementById('pairDisplaySecond');

    firstType = document.getElementById('pairTypeFirst');
    secondType = document.getElementById('pairTypeSecond');

    // singleton pattern
    private constructor() {
        this.firstDisplay.innerText = JSON.stringify(this.pair.first);
        this.secondDisplay.innerText = JSON.stringify(this.pair.second);

        this.firstType.innerText = typeof this.pair.first;
        this.secondType.innerText = typeof this.pair.second;
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