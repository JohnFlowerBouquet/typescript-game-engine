import Entity from "./Entity";
import Keyboard, { KeyState } from "./KeyboardState";

export function setupKeyboard(entity: Entity): Keyboard {
    const input = new Keyboard();
    input.addMaping("Space", (keyState: KeyState) => {
        if (keyState === KeyState.pressed) {
            entity.trait("jump").start();
        }
    });
    input.addMaping("ArrowLeft", (keyState) => {
        if (keyState === KeyState.pressed) {
            entity.trait("walk").start(-1);
        } else {
            entity.trait("walk").start(1);
        }
        
    });
    input.addMaping("ArrowRight", (keyState) => {
        if (keyState === KeyState.pressed) {
            entity.trait("walk").start(1);
        } else {
            entity.trait("walk").start(-1);
        }
    });

    return input;
}
