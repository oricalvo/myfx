import {getElementBySelector, getElementPath} from "../dom.helpers";
import {TemplateExpressionMetadata, TemplateExpressionType} from "./compiler";

export class EventExpression {
    constructor(public event: string, public selector: string, public method: string) {
    }

    compile(template: HTMLElement): EventExpressionMetadata {
        const element = getElementBySelector(template, this.selector);
        const path = getElementPath(template, element);

        return {
            type: TemplateExpressionType.Event,
            event: this.event,
            method: this.method,
            path,
        }
    }
}

export interface EventExpressionMetadata extends TemplateExpressionMetadata {
    path: number[];
    event: string;
    method: string;
}
