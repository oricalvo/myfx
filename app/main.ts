import * as fx from "../fx/core";
import {AppComponent} from "./app.component";
import {ContactListComponent} from "./contactList.component";

init();

async function init() {
    try {
        await fx.init([
            AppComponent,
            ContactListComponent,
        ]);

        await fx.mount(document.querySelector("app-root"), AppComponent);
    }
    catch (err) {
        console.error(err);
    }
}
