"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../fx/core");
const clock_component_html_1 = require("./clock.component.html");
const clock_component_css_1 = require("./clock.component.css");
class ClockComponent {
    constructor() {
        console.log("ClockComponent.ctor");
        this.time = new Date();
        setInterval(() => {
            this.time = new Date();
            core_1.update(this);
        }, 1000);
    }
}
ClockComponent.metadata = {
    name: "app-clock",
    template: clock_component_html_1.default,
    styles: clock_component_css_1.default,
};
exports.ClockComponent = ClockComponent;
ClockComponent.bind = function (binder) {
    binder.text("span.time", "time");
};
//# sourceMappingURL=clock.component.js.map