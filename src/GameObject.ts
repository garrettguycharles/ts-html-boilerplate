import {Canvas} from "./Canvas";
import {GameSprite} from "./GameSprite";
import {GameContext} from "./GameContext";
import {Polygon} from "./geometry/Polygon";

export class GameObject extends Polygon {
    sprite: GameSprite | null = null;

    get z_index(): number {
        return this.bottom;
    }

    constructor(width = 32, height = 32) {
        super([]);
        this.width = width;
        this.height = height;
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