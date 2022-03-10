import InputRouter from "./InputRouter";
import Keyboard, { KeyState } from "./KeyboardState";
import Walk from "./traits/Walk";

export function setupKeyboard(window: Window): InputRouter {
    const input = new Keyboard();
    const router = new InputRouter();
    input.listenTo(window);

    input.addMaping("Space", (keyState: KeyState) => {
        if (keyState === KeyState.pressed) {
            router.route(entity => entity.trait("jump").start());
        }
    });

    input.addMaping("ArrowLeft", (keyState) => {
        if (keyState === KeyState.pressed) {
            router.route(entity => entity.trait("walk").start(-1));
        } else {
            router.route(entity => entity.trait("walk").start(1));
        }
        
    });

    input.addMaping("ArrowRight", (keyState) => {
        if (keyState === KeyState.pressed) {
            router.route(entity => entity.trait("walk").start(1));
        } else {
            router.route(entity => entity.trait("walk").start(-1));
        }
    });

    input.addMaping("ShiftLeft", (keyState: KeyState) => {
        if (keyState === KeyState.pressed) {
           (router.route(entity => (entity.trait("walk") as Walk).sprint(true)));
        } else {
            (router.route(entity => (entity.trait("walk") as Walk).sprint(false)));
        }
    });

    return router;
}
