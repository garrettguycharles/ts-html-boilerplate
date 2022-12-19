import {Vector2} from "./Vector2";

export class LineSegment {
    start: Vector2;
    end: Vector2;

    constructor(start: Vector2, end: Vector2) {
        this.start = start;
        this.end = end;
    }

    intersection(o: LineSegment): Vector2 | null {
        const p0_x = this.start.x;
        const p0_y = this.start.y;
        const p1_x = this.end.x;
        const p1_y = this.end.y;
        const p2_x = o.start.x;
        const p2_y = o.start.y;
        const p3_x = o.end.x;
        const p3_y = o.end.y;

        const s1_x = p1_x - p0_x;
        const s1_y = p1_y - p0_y;
        const s2_x = p3_x - p2_x;
        const s2_y = p3_y - p2_y;

        const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        const t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

        if (s > 0 && s < 1 && t > 0 && t < 1) {
            // collision detected
            const x = p0_x + (t * s1_x);
            const y = p0_y + (t * s1_y);

            return new Vector2(x, y);
        }

        return null;
    }

    get dx(): number {
        return this.end.x - this.start.x;
    }

    get dy(): number {
        return this.end.y - this.start.y;
    }

    get vect(): Vector2 {
        return this.start.to(this.end);
    }

    get outward(): Vector2 {
        return this.vect.perpLeft();
    }

    get inward(): Vector2 {
        return this.vect.perpRight();
    }
}