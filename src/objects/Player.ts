import {GameObject} from "../GameObject";
import {GameSprite} from "../GameSprite";
import {Canvas} from "../Canvas";
import {Vector2} from "../geometry/Vector2";
import {lerp} from "../utils/utils";
import {Keyboard} from "../Keyboard";
import {GameContext} from "../GameContext";
import {LineSegment} from "../geometry/LineSegment";
import {getConfigParseResult} from "ts-loader/dist/config";

export class Player extends GameObject {
    sprite: GameSprite;
    velocity = Vector2.ZERO();
    max_speed = 2;

    friction = 0.8;

    direction = 1;
    facing = 1;

    scale = Vector2.ONE();

    constructor() {
        super(16, 16);

        this.sprite = new GameSprite(32, 48);
        this.sprite.loadSpritesheet("/resources/sprites/mario-walk.png",
            60, 95, 0, 7, 7, 1);
    }

    get_movement_vector_from_inputs(): Vector2 {
        const toReturn = Vector2.ZERO();

        if (Keyboard.getInstance().check_pressed("ArrowLeft")) {
            toReturn.x -= 1;
        }
        if (Keyboard.getInstance().check_pressed("ArrowUp")) {
            toReturn.y -= 1;
        }
        if (Keyboard.getInstance().check_pressed("ArrowRight")) {
            toReturn.x += 1;
        }
        if (Keyboard.getInstance().check_pressed("ArrowDown")) {
            toReturn.y += 1;
        }

        return toReturn;
    }

    move_(v: Vector2, context: GameContext): void {
        const otherObjects = context.getRoom().objects;

        const oldCenter = Vector2.from(this.center);

        this.center = this.center.add(v);

        for (const o of otherObjects.filter(_o => _o != this)) {
            if (this.colliderect(o)) {
                this.center = oldCenter;
                return;
            }
        }
    }

    move(velocity: Vector2, context: GameContext): void {
        if (velocity.magnitude() == 0) {
            return;
        }

        const path_lines = this.getVertices().map(vertex => new LineSegment(vertex, vertex.add(velocity)));

        let closest_intersecting_object: GameObject;
        let closest_intersection_point: Vector2;
        let closest_intersecting_line: LineSegment;
        let closest_intersection_movement_vect: Vector2;
        let shortest_intersection_distance: number = null;

        for (const obj of context.getRoom().objects.filter(o => o !== this)) {
            for (const path_line of path_lines) {
                for (const edge of obj.getLines()) {
                    const intersection = path_line.intersection(edge);

                    if (intersection) {
                        const movement_to_intersection = path_line.start.to(intersection);
                        let is_nearest_intersection = false;
                        if (!closest_intersecting_object) {
                            is_nearest_intersection = true;
                        } else {
                            if (movement_to_intersection.magnitude() < shortest_intersection_distance) {
                                is_nearest_intersection = true;
                            }
                        }


                        if (is_nearest_intersection) {
                            closest_intersecting_object = obj;
                            closest_intersection_point = intersection;
                            closest_intersection_movement_vect = movement_to_intersection;
                            closest_intersecting_line = edge;
                            shortest_intersection_distance = closest_intersection_movement_vect.magnitude();
                        }
                    }
                }
            }
        }

        if (!closest_intersecting_object) {
            this.center = this.center.add(velocity);
        } else {
            let residual_vect = velocity.projectOnto(closest_intersecting_line.vect)
                .scaleTo(velocity.magnitude() - shortest_intersection_distance);

            if (residual_vect.isObtuseWith(velocity)) {
                residual_vect = residual_vect.invert();
            }

            if (Math.abs(closest_intersecting_line.vect.degreesTo(velocity)) - 90 < 15) {
                residual_vect = Vector2.ZERO();
            }

            this.center = this.center.add(
                closest_intersection_movement_vect
                    .add(residual_vect)
                    .add(closest_intersecting_line.outward.scaleTo(1))
            );
        }
    }

    async update(context: GameContext): Promise<void> {
        const inputs = this.get_movement_vector_from_inputs();
        this.velocity = this.velocity.add(inputs.scaleTo(0.5));

        if (this.velocity.magnitude() > this.max_speed) {
            this.velocity = this.velocity.scaleTo(this.max_speed);
        }

        this.move(this.velocity, context);

        this.sprite.midbottom = this.midbottom;

        // update the sprite speed
        const speed_magnitude = this.velocity.magnitude();

        this.direction = this.velocity.x < 0 ? -1 : 1;

        this.sprite.fps = speed_magnitude * 5;
        if (speed_magnitude < 0.01) {
            this.sprite.index = 0;
        }

        this.sprite.scale = Vector2.from(this.scale);
        this.sprite.scale.x *= this.facing;

        this.facing = lerp(this.facing, this.direction, 0.3);

        this.velocity = this.velocity.scale(this.friction);

        this.sprite.angle = speed_magnitude * 4 * this.sprite.scale.x;

        this.sprite.update(context);
    }

    draw(canvas: Canvas) {
        this.sprite.draw(canvas);
    }
}