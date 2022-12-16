import {Rectangle} from "./geometry/Rectangle";

export class GameCamera extends Rectangle {

    room: Rectangle;

    constructor(room: Rectangle, left = 0, top = 0, width = 256, height = 240) {
        super(left, top, width, height);
        this.room = room;
    }

    public async update(): Promise<void> {
        this.center = this.room.center;
    }
}