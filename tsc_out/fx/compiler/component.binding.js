"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const registry_1 = require("../registry");
class ComponentExpression {
    constructor(selector) {
        this.selector = selector;
    }
    compile(template) {
        const element = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, element);
        const index = registry_1.getComponentIndex(element.localName);
        return {
            componentIndex: index,
            path,
        };
    }
}
exports.ComponentExpression = ComponentExpression;
//# sourceMappingURL=component.binding.js.map