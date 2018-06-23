"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class EventExpression {
    constructor(event, selector, method) {
        this.event = event;
        this.selector = selector;
        this.method = method;
    }
    compile(template) {
        const element = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, element);
        return {
            event: this.event,
            method: this.method,
            path,
        };
    }
}
exports.EventExpression = EventExpression;
//# sourceMappingURL=event.binding.js.map