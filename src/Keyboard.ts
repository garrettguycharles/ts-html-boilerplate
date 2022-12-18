export class Keyboard {
    private keys = new Map<string, boolean>();

    private constructor() {
        document.body.addEventListener("keydown", (e) => {
            this.keys.set(e.key, true);
        });

        document.body.addEventListener("keyup", (e) => {
            this.keys.set(e.key, false);
        });
    }

    private static instance: Keyboard;

    public static getInstance(): Keyboard {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }

        return Keyboard.instance;
    }

    public check_pressed(key: string): boolean {
        return this.keys.has(key) && this.keys.get(key);
    }
}