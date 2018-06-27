import {appStore} from "./appStore";
import {appService} from "./app.service";
import {event, ref, text} from "../fx/compiler/expressions";
import {list} from "../fx/compiler/expressions";

export class NewContactComponent {
    static metadata = {
        name: "app-new-contact",
        template: `
            <input>
            <button>Add</button>
        `,
        bindings: [
            ref("input", "inputName"),
            event("click", "button", "add"),
        ],
    };

    inputName: HTMLInputElement;

    constructor() {
        console.log("NewContactComponent.ctor");
    }

    add(event, contact) {
        console.log("add", this.inputName.value);

        appService.addContact(this.inputName.value);
    }
}
