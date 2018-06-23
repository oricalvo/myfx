"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const core_1 = require("../core");
const registry_1 = require("../registry");
class ComponentExpressionLinker {
    constructor() {
    }
    link(host, expr, component, context) {
        const element = dom_helpers_1.getElementByPath(host, expr.path);
        return new ComponentExpressionBinding(element, expr, component);
    }
}
exports.ComponentExpressionLinker = ComponentExpressionLinker;
class ComponentExpressionBinding {
    constructor(element, expr, component) {
        this.element = element;
        this.expr = expr;
        this.component = component;
        const compType = registry_1.getComponentTypeByIndex(expr.componentIndex);
        this.mountedComponent = core_1.mount(element, compType);
    }
    update() {
    }
    unlink() {
    }
}
exports.ComponentExpressionBinding = ComponentExpressionBinding;
//# sourceMappingURL=component.binding.js.map