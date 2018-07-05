import {appStore} from "./appStore";
import {appService} from "./app.service";
import template from "./app.component.html";
import {component, event, text} from "../fx/compiler/expressions";
import {ComponentMetadata} from "../fx/compiler/compiler";

export class AppComponent {
    static metadata: ComponentMetadata = {
        type: "component",
        name: "app-root",
        template: `<h1>Hello</h1>
            <div>
                <button class="dec">Dec</button>
                <span class="counter"></span>
                <button class="inc">Inc</button>            
            </div>
            <app-new-contact></app-new-contact>
            <app-contact-list></app-contact-list>
            <app-clock></app-clock>
        `,
        bindings: [
            text("span.counter", "counter"),
            event("click", "button.inc", "inc"),
            event("click", "button.dec", "dec"),
            component("app-contact-list"),
            component("app-new-contact"),
            component("app-clock"),
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
