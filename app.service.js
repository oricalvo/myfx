import {update} from "./fx";
import {appStore} from "./appStore";
import * as fx from "./fx";

class AppService {
    inc() {
        console.log("inc");

        appStore.counter++;

        fx.update();
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
