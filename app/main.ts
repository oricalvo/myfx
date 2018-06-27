import * as fx from "../fx/core";
import {AppComponent} from "./app.component";
import {ContactListComponent} from "./contactList.component";
import {NewContactComponent} from "./newContact.component";
import {ContactItemComponent} from "./contactItem.component";

init();

async function init() {
    try {
        await fx.init([
            AppComponent,
            ContactListComponent,
            NewContactComponent,
            ContactItemComponent,
        ]);

        await fx.mount(document.querySelector("app-root"), AppComponent);
    }
    catch (err) {
        console.error(err);
    }
}
