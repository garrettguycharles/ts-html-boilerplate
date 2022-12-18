import {GameRoom} from "./GameRoom";
import {Player} from "./objects/Player";
import {Box} from "./objects/Box";

/**
 * Use this class to swap the current room.
 * This class could handle loading and interpreting
 * room configuration files as well.
 */
export class GameRoomLoader {
    loadInit(): GameRoom {
        const toReturn = new GameRoom(512, 480);
        const player = new Player();
        toReturn.camera.target = player;
        player.center = toReturn.center;
        toReturn.objects.push(player);

        const box = new Box();
        box.top = 200;
        box.left = 200;
        toReturn.objects.push(box);

        return toReturn;
    }
}