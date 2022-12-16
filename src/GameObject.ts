import {Canvas} from "./Canvas";
import {Rectangle} from "./geometry/Rectangle";

export class GameObject extends Rectangle {
    constructor() {
        super(0, 0, 32, 32);
    }

    public async update(): Promise<void> {
    }

    public draw(canvas: Canvas): void {
    }
}