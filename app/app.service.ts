import {appStore} from "./appStore";
import {update} from "../fx/core";

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
}

export const appService = new AppService();
