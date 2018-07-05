export function padLeft(str: string, padWith: string, length: number) {
    if(str.length >= length) {
        return str;
    }

    for(let i=0; i<length-str.length; i++) {
        str = padWith[0] + str;
    }

    return str;
}
