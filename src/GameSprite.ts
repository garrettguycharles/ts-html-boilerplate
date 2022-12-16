import {GameObject} from "./GameObject";
import {Canvas} from "./Canvas";
import {Vector2} from "./geometry/Vector2";

export class GameSprite extends GameObject {
    spritesheet: Canvas;
    spritesheetUrl: string;
    numFrames: number;
    frameSeparation: number;
    framesPerRow: number;
    numRows: number;
    index: number;
    frameWidth: number;
    frameHeight: number;
    angle = 180;
    scale = Vector2.ONE();

    constructor(width = 32, height = 32) {
        super();
        this.index = 0;
        this.width = width;
        this.height = height;
        this.spritesheet = new Canvas(document.createElement("canvas"));
    }


    async update(): Promise<void> {
        this.index += 1;
        this.angle -= 1;
        if (this.index >= this.numFrames) {
            this.index = 0;
        }
    }

    draw(canvas: Canvas) {
        const row = Math.floor(this.index / this.framesPerRow);
        const column = this.index - (this.framesPerRow * row);

        const left = column * (this.frameWidth + this.frameSeparation);
        const top = row * (this.frameHeight + this.frameSeparation);

        canvas.draw
            .save()
            .translate(this.origin)
            .rotate(this.angle)
            .scale(this.scale.x, this.scale.y)
            // .mirrorHorz()
            .canvas(this.spritesheet,
                left, top, this.frameWidth, this.frameHeight,
                // this.left, this.top, this.right, this.bottom
                this.x-this.origin.x, this.y-this.origin.y,
                this.width, this.height
            )
            .restore();
    }

    public loadSpritesheet(url: string, frameWidth: number, frameHeight: number, frameSeparation: number, numFrames: number, framesPerRow: number, numRows: number) {
        this.spritesheetUrl = url;
        this.frameSeparation = frameSeparation;
        this.numFrames = numFrames;
        this.framesPerRow = framesPerRow;
        this.numRows = numRows;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        const img = new Image();
        img.onload = () => {
            this.spritesheet.width = img.width;
            this.spritesheet.height = img.height;
            this.spritesheet.draw.image(img,
                0, 0, img.width, img.height,
                0, 0, this.spritesheet.width, this.spritesheet.height);
        };

        img.src = this.spritesheetUrl;
    }

    get origin(): Vector2 {
        return this.midbottom;
    }
}