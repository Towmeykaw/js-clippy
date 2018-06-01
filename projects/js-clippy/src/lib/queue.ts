let _onEmptyCallback: any;
export class Queue {
    private active = false;
    private _queue: any[];
    constructor() {
        this._queue = [];
    }
    createCallback = (onEmptyCallback) => {
        _onEmptyCallback = onEmptyCallback;
    }
    enqueue (func) {
        this._queue.push(func);

        if (this._queue.length === 1 && !this.active) {
            this.progressQueue();
        }
    }
    progressQueue = () => {

        // stop if nothing left in queue
        if (!this._queue.length) {
            _onEmptyCallback();
            return;
        }

        const f = this._queue.shift();
        this.active = true;

        const completeFunction = (this.next.bind(this));
        f(completeFunction);
    }

    clear = () => {
        this._queue = [];
    }

    next = () => {
        this.active = false;
        this.progressQueue();
    }
}
