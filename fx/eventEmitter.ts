export class EventEmitter {
    listeners: any[];

    constructor() {
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    emit(...args) {
        for(const listener of this.listeners) {
            listener(...args);
        }
    }
}
