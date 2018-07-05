import {FormatterMetadata} from "../fx/compiler/compiler";
import {padLeft} from "./string.helpers";

const metadata: FormatterMetadata = {
    type: "formatter",
    name: "time"
};

export function timeFormatter(time: Date): string {
    if(!(time instanceof Date)) {
        throw new Error("Argument should be of type Date");
    }

    const hours = time.getHours();
    const seconds = time.getSeconds();

    return (hours == 0 ? "00" : time.getHours()) + ":" +
        padLeft(time.getMinutes().toString(), "0", 2) + ":" +
        padLeft(seconds.toString(), "0", 2);
}

timeFormatter["metadata"] = metadata;
