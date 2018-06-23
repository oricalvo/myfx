import {getElementBySelector, getElementPath} from "../dom.helpers";
import {TemplateExpressionMetadata, TemplateExpressionType} from "./compiler";

export class TextExpression {
    constructor(public template: Element,
                public selector: string,
                public prop: string) {
    }

    compile(template: HTMLElement): TextExpressionMetadata {
        const element = getElementBySelector(template, this.selector);
        const path = getElementPath(template, element);
        return {
            type: TemplateExpressionType.Text,
            path,
            prop: this.prop,
        };
    }
}

export interface TextExpressionMetadata extends TemplateExpressionMetadata {
    path: number[];
    prop: string;
}
