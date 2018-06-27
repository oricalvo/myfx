"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fx = require("../fx/core");
const app_component_1 = require("./app.component");
const contactList_component_1 = require("./contactList.component");
const newContact_component_1 = require("./newContact.component");
init();
async function init() {
    try {
        await fx.init([
            app_component_1.AppComponent,
            contactList_component_1.ContactListComponent,
            newContact_component_1.NewContactComponent,
        ]);
        await fx.mount(document.querySelector("app-root"), app_component_1.AppComponent);
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=main.js.map