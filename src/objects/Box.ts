import {GameObject} from "../GameObject";
import {Canvas} from "../Canvas";
import {GameSprite} from "../GameSprite";
import {GameContext} from "../GameContext";

export class Box extends GameObject {

    constructor() {
        super(32, 32);

        this.sprite = new GameSprite(32, 32);
        this.sprite.loadSpritesheet("/resources/sprites/box.png", 64, 64, 0, 1, 1, 1);
    }

    async update(context: GameContext): Promise<void> {
        this.sprite.topleft = this.topleft;

        await this.sprite.update(context);
    }

    draw(canvas: Canvas, context: GameContext) {
        super.draw(canvas, context);

        canvas.draw.text(
            this.getVertices().map(v => `(${v.x},${v.y})`).toString(),
            this.centerX,
            this.bottom + 20
        );
    }
}