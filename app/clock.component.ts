import {update} from "../fx/core";
import template from "./clock.component.html";
import styles from "./clock.component.css";

export class ClockComponent {
    static metadata = {
        name: "app-clock",
        template,
        styles,
    };

    time: Date;

    constructor() {
        console.log("ClockComponent.ctor");

        this.time = new Date();

        setInterval(()=> {
            this.time = new Date();

            update(this);
        }, 1000);
    }
}

ClockComponent.bind = function(binder) {
    binder.text("span.time", "time");
}
