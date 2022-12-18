import {Rectangle} from "./geometry/Rectangle";
import {GameObject} from "./GameObject";
import {GameContext} from "./GameContext";

export class GameCamera extends Rectangle {

    room: Rectangle;
    target: GameObject | null = null;

    constructor(room: Rectangle, left = 0, top = 0, width = 256, height = 240) {
        super(left, top, width, height);
        this.room = room;
    }

    public async update(context: GameContext): Promise<void> {
        if (this.target) {
            this.center = this.center.lerpTowards(this.target.center, 0.3);
        }
    }

}