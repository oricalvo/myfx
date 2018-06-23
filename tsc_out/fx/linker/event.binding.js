"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class EventExpressionLinker {
    constructor(metadata) {
        this.metadata = metadata;
    }
    link(host, instance, context) {
        const element = dom_helpers_1.getElementByPath(host, this.metadata.path);
        this.listener = (event) => {
            instance[this.metadata.method].call(instance, event, context);
        };
        element.addEventListener(this.metadata.event, this.listener);
    }
    unlink(element) {
        element.removeEventListener(this.metadata.event, this.listener);
        this.listener = null;
    }
}
//# sourceMappingURL=event.binding.js.map