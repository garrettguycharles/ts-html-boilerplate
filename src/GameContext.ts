import {Game} from "./Game";
import {GameRoom} from "./GameRoom";

export class GameContext {
    private game: Game;
    private room: GameRoom;

    withGame(game: Game): GameContext {
        this.game = game;
        return this;
    }

    getGame(): Game {
        return this.game;
    }

    withRoom(room: GameRoom): GameContext {
        this.room = room;
        return this;
    }

    getRoom(): GameRoom {
        return this.room;
    }
}