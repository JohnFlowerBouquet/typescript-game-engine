import Entity from "./Entity";

export default class EntityCollider {
    constructor(private _entities: Set<Entity>){}

    public check(entity: Entity): void {
        this._entities.forEach(collidingCandidate => {
            if (entity === collidingCandidate) {
                return;
            }

            if (entity.hitBox.overlaps(collidingCandidate.hitBox)) {
                entity.collides(collidingCandidate);
            }
        })
    }
}