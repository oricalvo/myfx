import {getElementBySelector, getElementPath} from "../dom.helpers";
import {TemplateExpression, TemplateExpressionMetadata, compileTemplate, TemplateExpressionType} from "./compiler";

export class ListExpression {
    constructor(public selector: string,
                public prop: string,
                public itemBindings: TemplateExpression[]) {
    }

    compile(template: HTMLElement): ListExpressionMetadata {
        const itemTemplate = getElementBySelector(template, this.selector);
        const path = getElementPath(template, itemTemplate);

        const parent = itemTemplate.parentElement;
        const comment = document.createComment("list");
        parent.insertBefore(comment, itemTemplate);
        parent.removeChild(itemTemplate);

        const res = compileTemplate(itemTemplate.outerHTML, this.itemBindings);

        return {
            type: TemplateExpressionType.List,
            prop: this.prop,
            path,
            template: res.template,
            expressions: res.expressions,
        }
    }
}

export interface ListExpressionMetadata extends TemplateExpressionMetadata {
    prop: string;
    path: number[];
    template: string;
    expressions: TemplateExpressionMetadata[];
}
