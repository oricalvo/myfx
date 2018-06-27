import {getElementBySelector, getElementPath} from "../dom.helpers";
import {TemplateExpressionType} from "./compiler";

export class RefExpression {
    constructor(public selector: string, public field: string) {
    }

    compile(template: HTMLElement): RefExpressionMetadata {
        const element = getElementBySelector(template, this.selector);
        const path = getElementPath(template, element);

        return {
            type: TemplateExpressionType.Ref,
            field: this.field,
            path,
        }
    }
}

export interface RefExpressionMetadata {
    type: TemplateExpressionType.Ref;
    path: number[];
    field: string;
}
