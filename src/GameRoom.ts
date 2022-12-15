import {GameCamera} from "./GameCamera";
import {GameObject} from "./GameObject";
import {Canvas} from "./Canvas";

export class GameRoom {
    camera: GameCamera;
    objects: GameObject[] = [];
    stage: Canvas;

    constructor() {
        this.camera = new GameCamera();
        this.stage = new Canvas(document.createElement("canvas"));
    }

    public async update(): Promise<void> {
        for (const object of this.objects) {
            await object.update();
        }

        await this.camera.update();
    }

    public draw(canvas: Canvas): void {
        // copy the part of the stage that is visible
        // to the camera onto the provided canvas.
        this.stage.clear();
        this.stage.draw.rectangle(10, 10, 20, 20, "red");

        for (const object of this.objects) {
            object.draw(this.stage);
        }

        canvas.draw.canvas(this.stage, this.camera.left, this.camera.top, this.camera.width, this.camera.height, 0, 0, canvas.width, canvas.height);
    }
}