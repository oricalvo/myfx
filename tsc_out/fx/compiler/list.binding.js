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
        const path = dom_helpers_1.getElementPath(template, template);
        const parent = template.parentElement;
        const comment = document.createComment("list");
        parent.insertBefore(comment, template);
        parent.removeChild(template);
        const { compiledTemplate, compiledBindings } = compiler_1.compileTemplate(itemTemplate.outerHTML, this.itemBindings);
        return {
            prop: this.prop,
            path,
            itemBindings: compiledBindings,
            itemTemplate: compiledTemplate.innerHTML,
        };
    }
}
exports.ListExpression = ListExpression;
//# sourceMappingURL=list.binding.js.map