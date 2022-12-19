import {degToRad, lerp, radToDeg} from "../utils/utils";

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
        return Vector2.from(this).scale(magnitude / (this.magnitude() + 0.000001));
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

    lerpTowards(o: Vector2, fraction: number): Vector2 {
        return new Vector2(lerp(this.x, o.x, fraction), lerp(this.y, o.y, fraction));
    }

    perpLeft(): Vector2 {
        return this.rotateDegrees(-90);
    }

    perpRight(): Vector2 {
        return this.rotateDegrees(90);
    }

    projectOnto(o: Vector2): Vector2 {
        if (o.magnitude() == 0) {
            return o;
        }

        if (this.magnitude() == 0) {
            return this;
        }

        return o.scale(
            this.dot(o) / o.dot(this)
        );
    }

    distanceTo(o: Vector2): number {
        return this.to(o).magnitude();
    }

    isAcuteWith(o: Vector2): boolean {
        return this.dot(o) > 0;
    }

    isObtuseWith(o: Vector2): boolean {
        return this.dot(o) < 0;
    }

    isPerpendicularTo(o: Vector2): boolean {
        return this.dot(o) == 0;
    }

    isParallelWith(o: Vector2): boolean {
        const n1 = this.normalize();
        const n2 = o.normalize();

        return n1.isEqualTo(n2) || n1.isEqualTo(n2.invert());
    }

    isEqualTo(o: Vector2, precision = 5): boolean {
        return this.x.toFixed(precision) == o.x.toFixed(precision) && this.y.toFixed(precision) == o.y.toFixed(precision);
    }
}
