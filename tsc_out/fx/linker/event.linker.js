"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class EventExpressionLinker {
    link(host, expr, component, context) {
        console.log("Linking event expression", expr.event, "to component", component);
        const element = dom_helpers_1.getElementByPath(host, expr.path);
        return new EventExpressionBinding(element, expr, component, context);
    }
}
exports.EventExpressionLinker = EventExpressionLinker;
class EventExpressionBinding {
    constructor(element, expr, component, context) {
        this.element = element;
        this.expr = expr;
        this.component = component;
        this.context = context;
        this.listener = (event) => {
            component[expr.method](event, this.context);
        };
        element.addEventListener(expr.event, this.listener);
    }
    update() {
    }
    unlink() {
        this.element.removeEventListener(this.expr.event, this.listener);
    }
}
exports.EventExpressionBinding = EventExpressionBinding;
//# sourceMappingURL=event.linker.js.map