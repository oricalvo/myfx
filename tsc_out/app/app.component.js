"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appStore_1 = require("./appStore");
const app_service_1 = require("./app.service");
const expressions_1 = require("../fx/compiler/expressions");
class AppComponent {
    constructor() {
        console.log("AppComponent.ctor");
    }
    get counter() {
        return appStore_1.appStore.counter;
    }
    dec() {
        app_service_1.appService.dec();
    }
    inc() {
        app_service_1.appService.inc();
    }
}
AppComponent.metadata = {
    name: "app-root",
    template: `<h1>Hello</h1>
            <button class="dec">Dec</button>
            <span class="counter"></span>
            <button class="inc">Inc</button>
            <app-contact-list></app-contact-list>`,
    bindings: [
        expressions_1.text("span.counter", "counter"),
        expressions_1.event("click", "button.inc", "inc"),
        expressions_1.event("click", "button.dec", "dec"),
        expressions_1.component("app-contact-list"),
    ],
};
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map