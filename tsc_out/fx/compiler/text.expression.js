"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const compiler_1 = require("./compiler");
class TextExpression {
    constructor(template, selector, prop) {
        this.template = template;
        this.selector = selector;
        this.prop = prop;
    }
    compile(template) {
        const element = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, element);
        return {
            type: compiler_1.TemplateExpressionType.Text,
            path,
            prop: this.prop,
        };
    }
}
exports.TextExpression = TextExpression;
//# sourceMappingURL=text.expression.js.map