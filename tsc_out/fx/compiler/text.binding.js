"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class TextBindingExpression {
    constructor(template, selector, prop) {
        this.template = template;
        this.selector = selector;
        this.prop = prop;
    }
    compile(template) {
        const element = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, element);
        return {
            path,
            prop: this.prop,
        };
    }
}
exports.TextBindingExpression = TextBindingExpression;
//# sourceMappingURL=text.binding.js.map