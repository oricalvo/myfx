"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class TextExpressionLinker {
    link(host, expr, component, context) {
        console.log("Linking text expression", expr.prop, "to component", component);
        const element = dom_helpers_1.getElementByPath(host, expr.path);
        return new TextExpressionBinding(element, expr, component, context);
    }
    unlink() {
    }
}
exports.TextExpressionLinker = TextExpressionLinker;
class TextExpressionBinding {
    constructor(element, expr, component, context) {
        this.element = element;
        this.expr = expr;
        this.component = component;
        this.context = context;
    }
    update() {
        const value = this.component[this.expr.prop];
        console.log("Updating text expression", this.expr.prop, "for component", this.component, "with value", value);
        this.element.innerText = value;
    }
    unlink() {
    }
}
exports.TextExpressionBinding = TextExpressionBinding;
//# sourceMappingURL=text.linker.js.map