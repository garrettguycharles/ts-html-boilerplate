import {GameCamera} from "./GameCamera";
import {GameObject} from "./GameObject";
import {Canvas} from "./Canvas";
import {Rectangle} from "./geometry/Rectangle";
import {GameContext} from "./GameContext";

export class GameRoom extends Rectangle {
    camera: GameCamera;
    objects: GameObject[] = [];
    stage: Canvas;

    constructor(width: number, height: number) {
        super(0, 0, width, height);
        this.camera = new GameCamera(this, 0, 0, 256, 240);
        this.stage = new Canvas(document.createElement("canvas"));
        this.stage.width = this.width;
        this.stage.height = this.height;
    }

    public async update(context: GameContext): Promise<void> {
        for (const object of this.objects) {
            await object.update(context);
        }

        await this.camera.update(context);
    }

    public draw(display: Canvas, context: GameContext): void {
        // copy the part of the stage that is visible
        // to the camera onto the provided canvas.
        display.clear("black");
        this.stage.clear("white");

        for (const object of this.objects) {
            object.draw(this.stage, context);
        }

        display.draw.canvas(this.stage,
            this.camera.left, this.camera.top, this.camera.width, this.camera.height,
            0, 0, display.width, display.height
        );
    }
}