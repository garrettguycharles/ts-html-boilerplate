export class DrawTools {
    private c: Canvas;
    constructor(canvas: Canvas) {
        this.c = canvas;
    }

    rectangle(left: number, top: number, width: number, height: number, color: string) {
        this.c.context.fillStyle = color;
        this.c.context.fillRect(left, top, width, height);
    }

    canvas(source: Canvas, sourceLeft: number, sourceTop: number, sourceRight: number, sourceBottom: number, destLeft: number, destTop: number, destRight: number, destBottom: number) {
        this.c.context.drawImage(source.canvas, sourceLeft, sourceTop, sourceRight - sourceLeft, sourceBottom - sourceTop, destLeft, destTop, destRight - destLeft, destBottom - destTop);
    }
}

export class Canvas {
    private _element: HTMLCanvasElement;
    public draw: DrawTools;

    constructor(el: HTMLCanvasElement) {
        this._element = el;
        this.draw = new DrawTools(this);
    }

    clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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