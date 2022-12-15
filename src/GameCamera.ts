import {Rectangle} from "./geometry/Rectangle";

export class GameCamera extends Rectangle {

    constructor(left = 0, top = 0, width = 300, height = 300) {
        super(left, top, width, height);
    }

    public async update(): Promise<void> {
    }
}