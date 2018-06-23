import {appStore} from "./appStore";
import {appService} from "./app.service";
import {event, text} from "../fx/compiler/expressions";
import {list} from "../fx/compiler/expressions";

export class ContactListComponent {
    static metadata = {
        name: "app-contact-list",
        template: `<ul>
            <li>
                <span class="name"></span>
                <button class="delete">Delete 3</button>
                <app-clock></app-clock>
            </li>
        </ul>`,
        bindings: [
            list("li", "contacts", [
                text("span.name", "name")
            ])
        ],
    };

    constructor() {
        console.log("ContactListComponent.ctor");
    }

    get contacts() {
        return appStore.contacts;
    }

    remove(event, contact) {
        console.log("remove");

        appService.removeContact(contact);
    }
}

// ContactListComponent.bind = function(binder) {
//     binder.list("li", "contacts", binder => {
//         binder.text("span.name", "name");
//         binder.event("click", "button.delete", "remove");
//         binder.component("app-clock");
//     });
// }
