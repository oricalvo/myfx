"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const registry_1 = require("../registry");
const compiler_1 = require("./compiler");
class ComponentExpression {
    constructor(selector) {
        this.selector = selector;
    }
    compile(template) {
        const element = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, element);
        const index = registry_1.getComponentTypeIndex(element.localName);
        return {
            type: compiler_1.TemplateExpressionType.Component,
            componentIndex: index,
            path,
        };
    }
}
exports.ComponentExpression = ComponentExpression;
//# sourceMappingURL=component.expression.js.map