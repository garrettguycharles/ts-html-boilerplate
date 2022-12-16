import {GameRoom} from "./GameRoom";
import {GameSprite} from "./GameSprite";
import {Vector2} from "./geometry/Vector2";

/**
 * Use this class to swap the current room.
 * This class could handle loading and interpreting
 * room configuration files as well.
 */
export class GameRoomLoader {
    loadInit(): GameRoom {
        const toReturn = new GameRoom(128, 128);
        const sprite = new GameSprite(32, 42);
        sprite.center = new Vector2(100, 100);
        sprite.loadSpritesheet(
            "/resources/sprites/mario-walking.png",
            32, 42, 0, 6 * 11 - 4, 6, 11);

        toReturn.objects.push(sprite);
        return toReturn;
    }
}