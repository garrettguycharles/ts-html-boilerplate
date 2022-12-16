import {Vector2} from "./geometry/Vector2";
import {degToRad} from "./utils/utils";

export class DrawTools {
    private c: Canvas;
    constructor(canvas: Canvas) {
        this.c = canvas;
    }

    save(): DrawTools {
        this.c.context.save();
        return this;
    }

    restore(): DrawTools {
        this.c.context.restore();
        return this;
    }

    translate(v: Vector2): DrawTools {
        this.c.context.translate(v.x, v.y);
        return this;
    }

    rotate(angle: number): DrawTools {
        this.c.context.rotate(degToRad(angle));
        return this;
    }

    scale(w: number, h: number): DrawTools {
        this.c.context.scale(w, h);
        return this;
    }

    mirrorHorz(): DrawTools {
        this.c.context.scale(-1, 1);
        return this;
    }

    mirrorVert(): DrawTools {
        this.c.context.scale(1, -1);
        return this;
    }

    rectangle(left: number, top: number, width: number, height: number, color: string): DrawTools {
        this.c.context.fillStyle = color;
        this.c.context.fillRect(left, top, width, height);
        return this;
    }

    canvas(source: Canvas, sourceLeft: number, sourceTop: number, sourceWidth: number, sourceHeight: number, destLeft: number, destTop: number, destWidth: number, destHeight: number): DrawTools {
        this.c.context.drawImage(source.canvas, sourceLeft, sourceTop, sourceWidth, sourceHeight, destLeft, destTop, destWidth, destHeight);
        return this;
    }

    image(source: CanvasImageSource, sourceLeft: number, sourceTop: number, sourceRight: number, sourceBottom: number, destLeft: number, destTop: number, destRight: number, destBottom: number): DrawTools {
        this.c.context.drawImage(source, sourceLeft, sourceTop, sourceRight - sourceLeft, sourceBottom - sourceTop, destLeft, destTop, destRight - destLeft, destBottom - destTop);
        return this;
    }

    text(text: string, x: number, y: number): DrawTools {
        this.c.context.fillText(text, x, y);
        return this;
    }

    begin(): DrawTools {
        this.c.context.beginPath();
        return this;
    }

    moveTo(v: Vector2): DrawTools {
        this.c.context.moveTo(v.x, v.y);
        return this;
    }

    lineTo(v: Vector2): DrawTools {
        this.c.context.lineTo(v.x, v.y);
        return this;
    }

    strokeStyle(style: string): DrawTools {
        this.c.context.strokeStyle = style;
        return this;
    }

    lineWidth(width: number): DrawTools {
        this.c.context.lineWidth = width;
        return this;
    }

    stroke(): DrawTools {
        this.c.context.stroke();
        return this;
    }
}

export class Canvas {
    private _element: HTMLCanvasElement;
    public draw: DrawTools;

    constructor(el: HTMLCanvasElement) {
        this._element = el;
        this.draw = new DrawTools(this);
    }

    clear(color = "#00000000"): void {
        this.draw
            .save()
            .rectangle(0, 0, this.width, this.height, color)
            .restore();
    }

    set width(w: number) {
        this._element.width = w;
    }

    get width(): number {
        return this._element.width;
    }

    set height(h: number) {
        this._element.height = h;
    }

    get height(): number {
        return this._element.height;
    }

    get context(): CanvasRenderingContext2D {
        return this._element.getContext("2d");
    }

    get canvas(): HTMLCanvasElement {
        return this._element;
    }
}