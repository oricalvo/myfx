"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class TextBinding {
    constructor(metadata, host, instance, context) {
        this.metadata = metadata;
        this.host = host;
        this.element = dom_helpers_1.getElementByPath(host, this.metadata.path);
    }
    update(instance, context) {
        this.element.innerText = context[this.metadata.prop];
    }
}
//# sourceMappingURL=text.binding.js.map