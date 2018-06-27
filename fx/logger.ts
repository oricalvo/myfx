export function createLogger(name) {
    return {
        log: console.log.bind(console, name),
        warn: console.warn.bind(console, name),
        error: console.error.bind(console, name),
    }
}
