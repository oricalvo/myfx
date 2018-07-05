import {event, text} from "../fx/compiler/expressions";
import {ComponentMetadata} from "../fx/compiler/compiler";

export class ContactItemComponent {
    static metadata: ComponentMetadata = {
        type: "component",
        name: "app-contact-item",
        template: `<span class="name"></span>
                <button class="delete">Delete</button>
                <button class="change">Change</button>
                <app-clock></app-clock>`,
        bindings: [
            text("span.name", "name"),
            event("click", "button.delete", "onRemoveContact"),
            event("click", "button.change", "onChangeContact"),
        ],
        properties: [
            "contact",
        ],
        events: [
            "onRemoveContact",
            "onChangeContact",
        ]
    };

    constructor() {
        console.log("ContactItemComponent.ctor");
    }
}
