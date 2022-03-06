
import Stomper from "./Stomper";
import Trait from "./Trait";

export default class Player extends Trait {
    public lives = 3;
    public score = 0;
    public coins = 0;
    
    constructor() {
        super('player');
        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100;
        });
    }
}