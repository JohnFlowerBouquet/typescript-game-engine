import Entity from "./Entity";
import EntityCollider from "./EntityCollider";
import { GameContext } from "./interface";
import Matrix from "./Matrix";
import MusicController from "./MusicController";
import MusicPlayer from "./MusicPlayer";
import { findPlayers } from "./player";
import Scene from "./Scene";
import TileCollider from "./TileCollider";

function focusPlayer(level: Level) {
    for (const player of findPlayers(level)) {
        level.camera.position.x = Math.max(0, player.position.x - 100);
    }
}

export default class Level extends Scene {
    public entities: Set<Entity>;
    public tiles: Matrix;
    public tileCollider: TileCollider;
    public gravity = 1500;
    public totalTime = 0;
    public readonly musicController: MusicController;

    private _entityCollider: EntityCollider;

    constructor(musicPlayer: MusicPlayer, public readonly name = "") {
        super();
        this.musicController = new MusicController(musicPlayer);
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
        this._entityCollider = new EntityCollider(this.entities);
    }

    public update(gameContext: GameContext): void {
        this.entities.forEach(entity => {
            entity.update(gameContext, this);
        })

        this.entities.forEach(entity => {
            this._entityCollider.check(entity);
        })

        this.entities.forEach(entity => entity.runQueuedTasks());

        focusPlayer(this);
        
        this.totalTime += gameContext.deltaTime;
    }

    public pause(): void {
        this.musicController.pauseAll();
    }
}