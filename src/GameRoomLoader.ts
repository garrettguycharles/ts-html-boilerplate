import {GameRoom} from "./GameRoom";
import {Player} from "./objects/Player";

/**
 * Use this class to swap the current room.
 * This class could handle loading and interpreting
 * room configuration files as well.
 */
export class GameRoomLoader {
    loadInit(): GameRoom {
        const toReturn = new GameRoom(512, 480);
        const player = new Player();
        player.center = toReturn.center;
        toReturn.objects.push(player);
        return toReturn;
    }
}