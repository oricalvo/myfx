import {TextExpression} from "./text.expression";
import {EventExpression, EventExpressionMetadata} from "./event.expression";
import {ComponentExpression, ComponentExpressionMetadata} from "./component.expression";
import {ListExpression, ListExpressionMetadata} from "./list.expression";
import {TemplateExpression} from "./compiler";

export function text(selector, prop) {
    return new TextExpression(this.template, selector, prop);
}

export function event(event, selector, method) {
    return new EventExpression(event, selector, method);
}

export function component(selector) {
    return new ComponentExpression(selector);
}

export function list(selector: string, prop: string, itemTemplateExpressions: TemplateExpression[]) {
    return new ListExpression(selector, prop, itemTemplateExpressions);
}
