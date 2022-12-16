export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static ZERO(): Vector2 {
        return new Vector2(0, 0);
    }

    public static ONE(): Vector2 {
        return new Vector2(1, 1);
    }
}