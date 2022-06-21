import {random_range} from "./utils/utils";
import {Tickable} from "./utils/Tickable";
import {IStringFormatter} from "./StringFormatter/abstract/StringFormatter";
import {SpookyStringFormatter} from "./StringFormatter/SpookyStringFormatter";
import {PlainStringFormatter} from "./StringFormatter/PlainStringFormatter";

export class App extends Tickable {
    input = document.getElementById('input') as HTMLInputElement;
    output = document.getElementById('output');
    stringFormatter: IStringFormatter = new PlainStringFormatter();

    spookyButton = document.getElementById('spookyButton');
    plainButton = document.getElementById('plainButton');
    backwardsButton = document.getElementById('backwardsButton');

    init(): void {
        this.spookyButton.addEventListener('click', () => {
            this.stringFormatter = new SpookyStringFormatter();
        });

        this.plainButton.addEventListener('click', () => {
            this.stringFormatter = new PlainStringFormatter();
        });

        // don't forget to plug in the BackwardsFormatter here!
        this.backwardsButton.addEventListener('click', () => {
            console.error(`Backwards button is not implemented!!`);
        });
    }

    // singleton pattern
    private constructor() {
        super();
        this.setTickDelay(1000/30)
        this.init();
    }

    private static instance: App;

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    onTick(): Promise<void> {
        // remove all children of output div
        while (this.output.children.length) {
            this.output.children[0].remove();
        }

        const stringPresentationElements = this.stringFormatter.format(this.input.value);

        for (const el of stringPresentationElements) {
            this.output.appendChild(el);
        }

        return Promise.resolve();
    }

    protected shouldContinueTicking(): boolean {
        return true;
    }
}

App.getInstance();