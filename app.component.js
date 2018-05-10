import {appStore} from "./appStore";
import {appService} from "./app.service";

import template from "./app.component.html";

export class AppComponent {
    constructor() {
        console.log("AppComponent.ctor");
    }

    get counter() {
        return appStore.counter;
    }

    dec() {
        appService.dec();
    }

    inc() {
        appService.inc();
    }
}

AppComponent.metadata = {
    name: "app-root",
    templateUrl: "app.component.html",
    stylesUrl: "app.component.css",
};

AppComponent.bind = function(binder) {
    binder.text("span.counter", "counter");
    binder.event("click", "button.inc", "inc");
    binder.event("click", "button.dec", "dec");
    binder.component("app-contact-list");
}
