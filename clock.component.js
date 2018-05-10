import {update} from "./fx";
import template from "./clock.component.html";
import styles from "./clock.component.css";

export class ClockComponent {
    constructor() {
        console.log("ClockComponent.ctor");

        this.time = new Date();

        setInterval(()=> {
            this.time = new Date();

            update(this);
        }, 1000);
    }
}

ClockComponent.metadata = {
    name: "app-clock",
    template,
    styles,
};

ClockComponent.bind = function(binder) {
    binder.text("span.time", "time");
}
