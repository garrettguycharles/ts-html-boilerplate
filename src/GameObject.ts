import {Canvas} from "./Canvas";
import {Rectangle} from "./geometry/Rectangle";
import {GameSprite} from "./GameSprite";
import {GameContext} from "./GameContext";

export class GameObject extends Rectangle {
    sprite: GameSprite | null = null;

    constructor(width = 32, height = 32) {
        super(0, 0, width, height);
    }

    public async update(context: GameContext): Promise<void> {
        await this.sprite.update(context);
    }

    public draw(canvas: Canvas, context: GameContext): void {
        if (this.sprite) {
            this.sprite.draw(canvas);
        }
    }
}