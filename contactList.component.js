import {appStore} from "./appStore";
import {appService} from "./app.service";

export class ContactListComponent {
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

ContactListComponent.metadata = {
    name: "app-contact-list",
    templateUrl: "contactList.component.html",
    stylesUrl: "contactList.component.css",
};

ContactListComponent.bind = function(binder) {
    binder.list("li", "contacts", binder => {
        binder.text("span.name", "name");
        binder.event("click", "button.delete", "remove");
        binder.component("app-clock");
    });
}
