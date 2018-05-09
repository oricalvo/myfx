import * as fx from "./fx";
import {AppComponent} from "./app.component";
import {ContactListComponent} from "./contactList.component";
import {ClockComponent} from "./clock.component";

init();

async function init() {
    try {
        await fx.init([
            AppComponent,
            ContactListComponent,
            ClockComponent,
        ]);

        await fx.mount(document.querySelector("app-root"), AppComponent);
    }
    catch (err) {
        console.error(err);
    }
}
