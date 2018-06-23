"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class TextExpressionLinker {
    link(host, expr, component, context) {
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
        this.element.innerText = this.component[this.expr.prop];
    }
    unlink() {
    }
}
exports.TextExpressionBinding = TextExpressionBinding;
//# sourceMappingURL=textExpressionLinker.js.map