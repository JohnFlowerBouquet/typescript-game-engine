
import Stomper from "./Stomper";
import Trait from "./Trait";

export default class Player extends Trait {
    private _lives = 3;
    private _score = 0;
    private _coins = 0;

    public get lives(): number {
        return this._lives;
    }

    public get score(): number {
        return this._score;
    }

    public get coins(): number {
        return this._coins;
    }

    public get playerName(): string {
        return this._playerName;
    }
    
    constructor(private _playerName = "") {
        super('player');
        this.listen(Stomper.EVENT_STOMP, () => {
            this._score += 100;
        });
    }

    public addCoins(count: number): void {
        this._coins += count;
        if (this._coins >= 100) {
            const lifeCount = Math.floor(this._coins / 100);
            this.addLives(lifeCount);
            this._coins = this._coins % 100;
        }
    }

    public addLives(count: number): void {
        this._lives += count;
    }
}