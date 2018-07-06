import {appStore} from "./appStore";
import {appService} from "./app.service";
import {component, event, text} from "../fx/compiler/expressions";
import {list} from "../fx/compiler/expressions";
import {ComponentMetadata} from "../fx/compiler/compiler";

export class ContactListComponent {
    static metadata: ComponentMetadata = {
        type: "component",
        name: "app-contact-list",
        template: `<ul>
            <li>
                <app-contact-item></app-contact-item>
            </li>
        </ul>`,
        bindings: [
            list("li", "contacts", [
                component("app-contact-item", {
                    properties: [
                        {target: "contact"}
                    ],
                    events: [
                        {source: "onRemoveContact", target: "remove"},
                        {source: "onChangeContact", target: "change"},
                    ]
                })
            ])
        ],
    };

    constructor() {
        console.log("ContactListComponent.ctor");
    }

    get contacts() {
        return appStore.contacts;
    }

    remove(contact) {
        console.log("remove");

        appService.removeContact(contact);
    }

    change(contact) {
        console.log("change");

        appService.updateContact({
            ...contact,
            name: "XXX",
        });
    }
}

// ContactListComponent.bind = function(binder) {
//     binder.list("li", "contacts", binder => {
//         binder.text("span.name", "name");
//         binder.event("click", "button.delete", "remove");
//         binder.component("app-clock");
//     });
// }
