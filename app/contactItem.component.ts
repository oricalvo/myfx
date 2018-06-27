import {event, text} from "../fx/compiler/expressions";

export class ContactItemComponent {
    static metadata = {
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
