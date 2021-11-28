import Timer from "./Timer";

describe("Timer", () => {
    it("should create", async () => {
        const timer = new Timer();
        expect(timer).toBeDefined();
    });

    it("start should start calling requestAnimationFrame", async () => {
        const timer = new Timer();
        const stub = jest.fn();
        timer.updateFunction = stub;
        const timeForOneUpdateCall = 1001 / 60;
        setupRAFForOneCall(timeForOneUpdateCall);
        timer.start();

        expect(stub).toHaveBeenCalledTimes(1);
    });

    it("updateFunction should be called at most 59 times per update call", async () => {
        const timer = new Timer();
        const stub = jest.fn();
        timer.updateFunction = stub;
        const longTimeBetweenUpdates = 2000;
        setupRAFForOneCall(longTimeBetweenUpdates);
        timer.start();

        expect(stub).toHaveBeenCalledTimes(59);
    });
});

function setupRAFForOneCall(timeAmount: number) {
    let calledRAFOnce = false;
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        if (!calledRAFOnce) {
            calledRAFOnce = true;
            cb(timeAmount);
        }
        return 0;
    });
}