"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appStore_1 = require("./appStore");
const app_service_1 = require("./app.service");
const expressions_1 = require("../fx/compiler/expressions");
const expressions_2 = require("../fx/compiler/expressions");
class ContactListComponent {
    constructor() {
        console.log("ContactListComponent.ctor");
    }
    get contacts() {
        return appStore_1.appStore.contacts;
    }
    remove(event, contact) {
        console.log("remove");
        app_service_1.appService.removeContact(contact);
    }
}
ContactListComponent.metadata = {
    name: "app-contact-list",
    template: `<ul>
            <li>
                <span class="name"></span>
                <button class="delete">Delete 3</button>
                <app-clock></app-clock>
            </li>
        </ul>`,
    bindings: [
        expressions_2.list("li", "contacts", [
            expressions_1.text("span.name", "name"),
            expressions_1.event("click", "button.delete", "remove"),
        ])
    ],
};
exports.ContactListComponent = ContactListComponent;
// ContactListComponent.bind = function(binder) {
//     binder.list("li", "contacts", binder => {
//         binder.text("span.name", "name");
//         binder.event("click", "button.delete", "remove");
//         binder.component("app-clock");
//     });
// }
//# sourceMappingURL=contactList.component.js.map