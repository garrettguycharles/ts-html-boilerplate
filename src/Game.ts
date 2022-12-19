import {Tickable} from "./utils/Tickable";
import {Canvas} from "./Canvas";
import {GameRoom} from "./GameRoom";
import {GameRoomLoader} from "./GameRoomLoader";
import {GameContext} from "./GameContext";

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
        const tickContext = new GameContext().withGame(this).withRoom(this.room);
        await this.update(tickContext);
        await this.draw(tickContext);
        this.previousTick = Date.now();
    }

    protected shouldContinueTicking(): boolean {
        return this.running;
    }

    public async update(context: GameContext): Promise<void> {
        await this.room.update(context);
    }

    public draw(context: GameContext) {
        this.room.draw(this.display, context);
    }

    protected initializeDisplay(display: Canvas) {
        display.width = 512;
        display.height = 480;
    }
}