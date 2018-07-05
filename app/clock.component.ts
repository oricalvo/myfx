import {update} from "../fx/core";
import {text} from "../fx/compiler/expressions";
import {ComponentMetadata} from "../fx/compiler/compiler";

export class ClockComponent {
    static metadata: ComponentMetadata = {
        type: "component",
        name: "app-clock",
        template: `
            <span></span>
        `,
        bindings: [
            text("span", "time", "time"),
        ]
    };

    time: Date;

    constructor() {
        this.time = new Date();

        setInterval(()=> {
            this.time = new Date();

            update(this);
        }, 1000);
    }
}
