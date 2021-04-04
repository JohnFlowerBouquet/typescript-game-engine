import Entity from "./Entity";
import Keyboard from "./KeyboardState";

export function setupKeyboard(entity: Entity): Keyboard {
    const input = new Keyboard();
    input.addMaping("Space", (keyState) => {
        if (keyState) {
            entity.trait("jump").start();
        } else {
            entity.trait("jump").cancel();
        }
    });
    input.addMaping("ArrowLeft", (keyState) => {
        entity.trait("walk").start(-1);
    });
    input.addMaping("ArrowRight", (keyState) => {
        entity.trait("walk").start(1);
    });

    return input;
}
