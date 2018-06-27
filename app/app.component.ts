import {appStore} from "./appStore";
import {appService} from "./app.service";
import template from "./app.component.html";
import {component, event, text} from "../fx/compiler/expressions";

export class AppComponent {
    static metadata = {
        name: "app-root",
        template: `<h1>Hello</h1>
            <div>
                <button class="dec">Dec</button>
                <span class="counter"></span>
                <button class="inc">Inc</button>            
            </div>
            <app-new-contact></app-new-contact>
            <app-contact-list></app-contact-list>`,
        bindings: [
            text("span.counter", "counter"),
            event("click", "button.inc", "inc"),
            event("click", "button.dec", "dec"),
            component("app-contact-list"),
            component("app-new-contact"),
        ],
    };

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
