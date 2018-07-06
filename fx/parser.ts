const cache = {};

export function parse(expr: string) {
    let fn = cache[expr];
    if(!fn) {
        fn = cache[expr] = new Function("context", "return context." + expr);
    }

    return fn;
}
