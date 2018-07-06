import {getElementBySelector, getElementPath} from "../dom.helpers";
import {TemplateExpressionMetadata, TemplateExpressionType} from "./compiler";
import {registry} from "../registry";

export class TextExpression {
    constructor(public template: Element,
                public selector: string,
                public prop: string,
                public formatter: string,
                public formatterArgs: any) {
    }

    compile(template: HTMLElement): TextExpressionMetadata {
        const element = getElementBySelector(template, this.selector);
        const path = getElementPath(template, element);

        const formatterIndex = this.formatter ? registry.formatters.getIndexByName(this.formatter) : -1;

        return {
            type: TemplateExpressionType.Text,
            path,
            expr: this.prop,
            formatterIndex,
            formatterArgs: this.formatterArgs,
        };
    }
}

export interface TextExpressionMetadata extends TemplateExpressionMetadata {
    path: number[];
    expr: string;
    formatterIndex: number;
    formatterArgs: any;
    formatter?: any;
    exprFn?: (component) => any;
}
