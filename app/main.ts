import * as fx from "../fx/core";
import {AppComponent} from "./app.component";
import {ContactListComponent} from "./contactList.component";
import {NewContactComponent} from "./newContact.component";

init();

async function init() {
    try {
        await fx.init([
            AppComponent,
            ContactListComponent,
            NewContactComponent,
        ]);

        await fx.mount(document.querySelector("app-root"), AppComponent);
    }
    catch (err) {
        console.error(err);
    }
}
