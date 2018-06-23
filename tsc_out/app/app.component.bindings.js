"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bindings_1 = require("../fx/compiler/bindings");
const bindings = [
    bindings_1.text("span.counter", "counter"),
    bindings_1.event("click", "button.inc", "inc"),
    bindings_1.event("click", "button.dec", "dec"),
    bindings_1.component("app-contact-list"),
];
exports.default = bindings;
//# sourceMappingURL=app.component.bindings.js.map