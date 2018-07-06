import {event, text} from "../fx/compiler/expressions";
import {ComponentMetadata} from "../fx/compiler/compiler";
import {EventEmitter} from "../fx/eventEmitter";
import {Contact} from "./appState";

export class ContactItemComponent {
    static metadata: ComponentMetadata = {
        type: "component",
        name: "app-contact-item",
        template: `<span class="name"></span>
                <button class="delete">Delete</button>
                <button class="change">Change</button>
                <app-clock></app-clock>`,
        bindings: [
            text("span.name", "contact.name"),
            event("click", "button.delete", "onButtonRemoveClicked"),
            event("click", "button.change", "onButtonChangeClicked"),
        ],
        properties: [
            "contact",
        ],
        events: [
            "onRemoveContact",
            "onChangeContact",
        ]
    };

    contact: Contact;
    onRemoveContact: EventEmitter;
    onChangeContact: EventEmitter;

    constructor() {
        console.log("ContactItemComponent.ctor");
    }

    onButtonRemoveClicked() {
        this.onRemoveContact.emit(this.contact);
    }

    onButtonChangeClicked() {
        this.onChangeContact.emit(this.contact);
    }
}
