import {GameCamera} from "./GameCamera";
import {GameObject} from "./GameObject";
import {Canvas} from "./Canvas";
import {Rectangle} from "./geometry/Rectangle";

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

    public async update(): Promise<void> {
        for (const object of this.objects) {
            await object.update();
        }

        await this.camera.update();
    }

    public draw(display: Canvas): void {
        // copy the part of the stage that is visible
        // to the camera onto the provided canvas.
        display.clear("black");
        this.stage.clear("white");
        this.stage.draw.rectangle(this.centerX, this.centerY, 5, 5, "red");

        for (const object of this.objects) {
            object.draw(this.stage);
        }

        display.draw.canvas(this.stage,
            this.camera.left, this.camera.top, this.camera.width, this.camera.height,
            0, 0, display.width, display.height
        );
    }
}