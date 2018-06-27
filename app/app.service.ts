import {appStore} from "./appStore";
import {update} from "../fx/core";
import {Contact} from "./appState";

class AppService {
    inc() {
        console.log("inc");

        appStore.counter++;

        update();
    }

    dec() {
        appStore.counter--;

        update();
    }

    removeContact(contact) {
        console.log("removeContact", contact);

        const index = appStore.contacts.indexOf(contact);
        if(index != -1) {
            appStore.contacts.splice(index, 1);

            update();
        }
    }

    addContact(name: string) {
        const contact: Contact = {
            id: -1,
            name,
        };

        appStore.contacts.push(contact);

        update();
    }

    updateContact(contact: Contact) {
        const res = appStore.contacts.find(c => c.id == contact.id);
        if(res) {
            Object.assign(res, contact);
        }

        update();
    }
}

export const appService = new AppService();
