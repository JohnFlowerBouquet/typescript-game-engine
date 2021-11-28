import Entity from "./Entity";
import Keyboard, { KeyState } from "./KeyboardState";
import Walk from "./traits/Walk";

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

    input.addMaping("ShiftLeft", (keyState: KeyState) => {
        if (keyState === KeyState.pressed) {
           (entity.trait("walk") as Walk).sprint(true);
        } else {
            (entity.trait("walk") as Walk).sprint(false);
        }
    });

    return input;
}
