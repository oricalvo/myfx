import * as fx from "../fx/core";
import {AppComponent} from "./app.component";
import {ContactListComponent} from "./contactList.component";
import {NewContactComponent} from "./newContact.component";
import {ContactItemComponent} from "./contactItem.component";
import {ClockComponent} from "./clock.component";
import {timeFormatter} from "./time.formatter";

init();

async function init() {
    try {
        await fx.init([
            AppComponent,
            ContactListComponent,
            NewContactComponent,
            ContactItemComponent,
            ClockComponent,
            timeFormatter,
        ]);

        await fx.mount(document.querySelector("app-root"), AppComponent);

        fx.update();
    }
    catch (err) {
        console.error(err);
    }
}
