
import Trait from "./Trait";

export default class Player extends Trait {
    public lives = 3;
    public scpre = 0;
    
    constructor() {
        super('player');
    }
}