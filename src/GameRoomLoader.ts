import {GameRoom} from "./GameRoom";

/**
 * Use this class to swap the current room.
 * This class could handle loading and interpreting
 * room configuration files as well.
 */
export class GameRoomLoader {
    loadInit(): GameRoom {
        return new GameRoom();
    }
}