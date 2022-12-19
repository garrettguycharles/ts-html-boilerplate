import {Rectangle} from "./Rectangle";
import {Vector2} from "./Vector2";
import {LineSegment} from "./LineSegment";

export class Polygon extends Rectangle {
    vertices: Vector2[] = [];
    closed: boolean;

    lines: LineSegment[] = [];

    constructor(vertices: Vector2[], closed = true) {
        super(0, 0, 1, 1);

        // if there are not enough vertices to make a polygon, then use the rectangle points.

        this.setVertices(vertices, closed);
    }

    setVertices(vertices: Vector2[], closed = true): Polygon {
        this.vertices = [...vertices];
        this.closed = closed;
        this.refreshLines();
        return this;
    }

    getVertices(): Vector2[] {
        if (this.vertices.length < 3) {
            return [this.topleft, this.topright, this.bottomright, this.bottomleft];
        }

        return this.vertices;
    }

    getLines(): LineSegment[] {
        if (!this.getVertices()[0].isEqualTo(this.lines[0].start)) {
            this.refreshLines();
        }

        return this.lines;
    }

    refreshLines(): void {
        this.lines = [];
        const vertices = this.getVertices();
        for (let i = 0; i < vertices.length - 1; i++) {
            this.lines.push(new LineSegment(vertices[i], vertices[i + 1]));
        }

        if (this.closed) {
            this.lines.push(new LineSegment(vertices[vertices.length - 1], vertices[0]));
        }

        this.refreshBoundingBox();
    }

    refreshBoundingBox(): void {
        const vertices = this.getVertices();

        const minX = Math.min(...vertices.map(v => v.x));
        const maxX = Math.min(...vertices.map(v => v.x));
        const minY = Math.min(...vertices.map(v => v.y));
        const maxY = Math.min(...vertices.map(v => v.y));

        this.width = maxX - minX;
        this.height = maxY - minY;

        this.topleft = new Vector2(minX, minY);
    }
}