"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appStore_1 = require("./appStore");
const core_1 = require("../fx/core");
class AppService {
    inc() {
        console.log("inc");
        appStore_1.appStore.counter++;
        core_1.update();
    }
    dec() {
        appStore_1.appStore.counter--;
        core_1.update();
    }
    removeContact(contact) {
        console.log("removeContact", contact);
        const index = appStore_1.appStore.contacts.indexOf(contact);
        if (index != -1) {
            appStore_1.appStore.contacts.splice(index, 1);
            core_1.update();
        }
    }
}
exports.appService = new AppService();
//# sourceMappingURL=app.service.js.map