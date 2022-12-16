import {Tickable} from "./utils/Tickable";
import {Canvas} from "./Canvas";
import {GameRoom} from "./GameRoom";
import {GameRoomLoader} from "./GameRoomLoader";

export class Game extends Tickable {
    private running = false;

    private display: Canvas;
    private room: GameRoom;
    private roomLoader: GameRoomLoader;
    private previousTick = Date.now();

    constructor(display: Canvas) {
        super();
        this.setTickFrequency(30);
        this.display = display;
        this.initializeDisplay(this.display);
        this.roomLoader = new GameRoomLoader();
        this.room = this.roomLoader.loadInit();
    }

    start(): void {
        this.running = true;
        this.scheduleTick();
    }

    stop(): void {
        this.running = false;
    }

    protected async onTick(): Promise<void> {
        await this.update();
        await this.draw();
        this.previousTick = Date.now();
    }

    protected shouldContinueTicking(): boolean {
        return this.running;
    }

    public async update(): Promise<void> {
        console.log("Tick");
        await this.room.update();
    }

    public draw() {
        this.room.draw(this.display);
        const now = Date.now();
        const timeDelta = Date.now() - this.previousTick;
        this.display.context.font = "20px bold serif";
        this.display.draw.text(`FPS: ${(1000 / timeDelta).toFixed(2)}`, 10, 10);
        this.previousTick = now;
    }

    protected initializeDisplay(display: Canvas) {
        display.width = 512;
        display.height = 480;
    }
}