import {getElementBySelector, getElementPath} from "../dom.helpers";
import {getComponentTypeIndex} from "../registry";
import {TemplateExpressionMetadata, TemplateExpressionType} from "./compiler";

export class ComponentExpression {
    constructor(public selector: string) {
    }

    compile(template: HTMLElement): ComponentExpressionMetadata {
        const element = getElementBySelector(template, this.selector);
        const path = getElementPath(template, element);
        const index = getComponentTypeIndex(element.localName);

        return {
            type: TemplateExpressionType.Component,
            componentIndex: index,
            path,
        };
    }
}

export interface ComponentExpressionMetadata extends TemplateExpressionMetadata {
    path: number[];
    componentIndex: number;
}
