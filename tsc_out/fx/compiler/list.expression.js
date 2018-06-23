"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
const compiler_1 = require("./compiler");
class ListExpression {
    constructor(selector, prop, itemBindings) {
        this.selector = selector;
        this.prop = prop;
        this.itemBindings = itemBindings;
    }
    compile(template) {
        const itemTemplate = dom_helpers_1.getElementBySelector(template, this.selector);
        const path = dom_helpers_1.getElementPath(template, itemTemplate);
        const parent = itemTemplate.parentElement;
        const comment = document.createComment("list");
        parent.insertBefore(comment, itemTemplate);
        parent.removeChild(itemTemplate);
        const res = compiler_1.compileTemplate(itemTemplate.outerHTML, this.itemBindings);
        return {
            type: compiler_1.TemplateExpressionType.List,
            prop: this.prop,
            path,
            template: res.template,
            expressions: res.expressions,
        };
    }
}
exports.ListExpression = ListExpression;
//# sourceMappingURL=list.expression.js.map