import {GameObject} from "../GameObject";
import {GameSprite} from "../GameSprite";
import {Canvas} from "../Canvas";
import {Vector2} from "../geometry/Vector2";
import {clamp} from "../utils/utils";

export class Keyboard {
    private keys = new Map<string, boolean>();

    private constructor() {
        document.body.addEventListener("keydown", (e) => {
            this.keys.set(e.key, true);
        });

        document.body.addEventListener("keyup", (e) => {
            this.keys.set(e.key, false);
        });
    }

    private static instance: Keyboard;

    public static getInstance(): Keyboard {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }

        return Keyboard.instance;
    }

    public check_pressed(key: string): boolean {
        return this.keys.has(key) && this.keys.get(key);
    }
}

export class Player extends GameObject {
    sprite: GameSprite;
    speed = Vector2.ZERO();
    max_speed = 4;

    targ_vect = Vector2.RIGHT().scale(20);

    friction = 0.8;

    constructor() {
        super();

        this.sprite = new GameSprite(32, 48);
        this.sprite.loadSpritesheet("/resources/sprites/mario-walk.png",
            60, 95, 0, 7, 7, 1);
    }

    async update(): Promise<void> {
        if (Keyboard.getInstance().check_pressed("ArrowLeft")) {
            this.speed.x -= 0.5;
        }
        if (Keyboard.getInstance().check_pressed("ArrowUp")) {
            this.speed.y -= 0.5;
        }
        if (Keyboard.getInstance().check_pressed("ArrowRight")) {
            this.speed.x += 0.5;
        }
        if (Keyboard.getInstance().check_pressed("ArrowDown")) {
            this.speed.y += 0.5;
        }

        this.speed.x = clamp(-this.max_speed, this.speed.x, this.max_speed);
        this.speed.y = clamp(-this.max_speed, this.speed.y, this.max_speed);

        this.x += this.speed.x;
        this.y += this.speed.y;

        this.speed.x *= this.friction;
        this.speed.y *= this.friction;

        this.sprite.midbottom = this.midbottom;

        // update the sprite speed
        const speed_magnitude = this.speed.magnitude();

        this.sprite.fps = speed_magnitude * 5;
        if (this.speed.x < 0) {
            this.sprite.scale.x = -1;
        } else {
            this.sprite.scale.x = 1;
        }

        if (speed_magnitude < 0.01) {
            this.sprite.index = 0;
        }

        this.sprite.angle = speed_magnitude * 4 * this.sprite.scale.x;

        this.sprite.update();
    }

    draw(canvas: Canvas) {
        this.targ_vect = this.targ_vect.rotateDegrees(1);

        this.sprite.draw(canvas);
        const centerOfRoom = new Vector2(canvas.width / 2, canvas.height / 2);
        const refVect = centerOfRoom.to(this.center);
        const rotatedVect = refVect.rotate(refVect.radiansTo(this.targ_vect));

        canvas.draw.begin()
            .lineWidth(1)
            .strokeStyle("blue")
            .moveTo(centerOfRoom)
            .lineTo(centerOfRoom.add(refVect))
            .stroke();

        canvas.draw.begin()
            .lineWidth(1)
            .strokeStyle("black")
            .moveTo(centerOfRoom)
            .lineTo(centerOfRoom.add(this.targ_vect))
            .stroke();

        canvas.draw.begin()
            .lineWidth(1)
            .strokeStyle("green")
            .moveTo(centerOfRoom)
            .lineTo(centerOfRoom.add(rotatedVect))
            .stroke();

        canvas.draw.text(
            refVect.radiansTo(Vector2.RIGHT()).toFixed(2),
            this.centerX,
            this.bottom + 20
        );

        canvas.draw.text(
            refVect.rotate(Vector2.RIGHT().radians()).radians().toFixed(2),
            this.centerX,
            this.bottom + 40
        );


    }
}