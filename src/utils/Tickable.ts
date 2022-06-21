import {sleep, setImmediate} from "./utils";

export abstract class Tickable {
    private scheduled_tick: NodeJS.Timeout | undefined;
    private tick_delay = 0;

    constructor() {
        setImmediate(this.scheduleTick.bind(this));
    }

    /**
     * Implement this with whatever functionality
     * you want to run every tick.
     * @protected
     */
    protected abstract onTick(): Promise<void> | void;

    /**
     * Return whether to schedule another tick
     * immediately following the current tick.
     *
     * @protected
     */
    protected abstract shouldContinueTicking(): boolean;

    /**
     * Set the tick delay. Each tick will wait this long
     * before continuing.
     *
     * @param ms
     */
    setTickDelay(ms: number): void {
        this.tick_delay = ms;
    }

    async tick() {
        await sleep(this.tick_delay);

        try {
            await this.onTick();
        } catch (e) {
            console.error(`Threw error during tick: ${(e as Error).message}`);
        }


        this.scheduled_tick = undefined;
        if (this.shouldContinueTicking()) {
            this.scheduleTick()
        }
    }

    scheduleTick() {
        if (!this.scheduled_tick) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            this.scheduled_tick = setImmediate(this.tick.bind(this));
        }
    }
}

export class TestableTickableSpy extends Tickable {
    invocations: {[key: string]: number} = {
        tick: 0,
        schedule_tick: 0,
        shouldContinueTicking: 0,
        onTick: 0
    };

    protected onTick(): Promise<void> {
        this.invocations.onTick += 1;
        return Promise.resolve(undefined);
    }

    protected shouldContinueTicking(): boolean {
        this.invocations.shouldContinueTicking += 1;
        return false;
    }


    async tick(): Promise<void> {
        this.invocations.tick += 1;
        super.tick();
        return Promise.resolve();
    }

    scheduleTick() {
        this.invocations.schedule_tick += 1;
        super.scheduleTick();
    }
}