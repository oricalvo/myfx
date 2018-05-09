import {update} from "./fx";

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
    templateUrl: "clock.component.html",
    stylesUrl: "clock.component.css",
};

ClockComponent.bind = function(binder) {
    binder.text("span.time", "time");
}
