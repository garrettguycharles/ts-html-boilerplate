import {degToRad, radToDeg} from "../utils/utils";

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

    public static RIGHT(): Vector2 {
        return new Vector2(1, 0);
    }

    public static UP(): Vector2 {
        return new Vector2(0, -1);
    }

    public static LEFT(): Vector2 {
        return new Vector2(-1, 0);
    }

    public static DOWN(): Vector2 {
        return new Vector2(0, 1);
    }

    public static from(v: Vector2): Vector2 {
        return new Vector2(v.x, v.y);
    }

    add(o: Vector2): Vector2 {
        return new Vector2(this.x + o.x, this.y + o.y);
    }

    subtract(o: Vector2): Vector2 {
        return this.add(o.invert());
    }

    scale(scale: number): Vector2 {
        return new Vector2(this.x * scale, this.y * scale);
    }

    scaleTo(magnitude: number): Vector2 {
        return Vector2.from(this).scale(magnitude / this.magnitude());
    }

    invert(): Vector2 {
        return this.scale(-1);
    }

    dot(o: Vector2): number {
        return this.x * o.x + this.y * o.y;
    }

    magnitude(): number {
        return Math.sqrt(this.dot(this))
    }

    normalize(): Vector2 {
        return this.scale(1 / this.magnitude());
    }

    radians(): number {
        return Math.atan2(this.y, this.x);
    }

    degrees(): number {
        return radToDeg(this.radians());
    }

    radiansTo(o: Vector2): number {
        const my_a2 = Math.atan2(this.y, this.x);
        const o_a2 = Math.atan2(o.y, o.x);
        const sign = o_a2 > my_a2 ? 1 : -1;
        const angle = o_a2 - my_a2;
        const K = -sign * Math.PI * 2;
        return (Math.abs(K + angle) < Math.abs(angle))? K + angle : angle;
    }

    degreesTo(o: Vector2): number {
        return radToDeg(this.radiansTo(o));
    }

    to(o: Vector2): Vector2 {
        return o.subtract(this);
    }

    rotate(radians: number): Vector2 {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        return new Vector2(
            this.x * cos - this.y * sin,
            this.y * cos + this.x * sin
        );
    }

    rotateDegrees(degrees: number): Vector2 {
        return this.rotate(degToRad(degrees));
    }
}