"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const core_1 = require("../core");
class ListExpressionLinker {
    constructor() {
    }
    link(host, expr, component, context) {
        const placeholder = dom_helpers_1.getElementByPath(host, expr.path);
        return new ListExpressionBinding(placeholder, expr, component);
    }
}
exports.ListExpressionLinker = ListExpressionLinker;
class ListExpressionBinding {
    constructor(placeholder, expr, component) {
        this.placeholder = placeholder;
        this.expr = expr;
        this.component = component;
    }
    update() {
        this.clean();
        this.elements = [];
        this.itemBindings = [];
        const collection = this.component[this.expr.prop];
        const collAsArray = Array.from(collection);
        const placeholderIndex = this.expr.path[this.expr.path.length - 1];
        const placeholderParent = this.placeholder.parentElement;
        if (collection) {
            for (let i = 0; i < collAsArray.length; i++) {
                const item = collAsArray[i];
                const clone = insertBefore(this.placeholder, this.expr.template);
                this.elements.push(clone);
                console.log("clone", clone);
                for (const expr of this.expr.expressions) {
                    const linker = core_1.getExpressionLinker(expr.type);
                    const binding = linker.link(clone, expr, item, item);
                    this.itemBindings.push(binding);
                    binding.update();
                }
            }
        }
    }
    clean() {
        if (this.elements) {
            for (const element of this.elements) {
                element.parentElement.removeChild(element);
            }
            this.elements = [];
        }
    }
    unlink() {
    }
}
exports.ListExpressionBinding = ListExpressionBinding;
function insertBefore(ref, template) {
    const cont = document.createElement("cont");
    const element = cont.childNodes[0];
    cont.innerHTML = template;
    ref.parentElement.insertBefore(element, ref);
    return element;
}
//# sourceMappingURL=list.linker.js.map