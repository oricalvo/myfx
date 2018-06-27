import {TextExpression} from "./text.expression";
import {EventExpression} from "./event.expression";
import {ComponentExpression} from "./component.expression";
import {ListExpression} from "./list.expression";
import {TemplateExpression} from "./compiler";
import {RefExpression} from "./ref.expression";

export function text(selector, prop) {
    return new TextExpression(this.template, selector, prop);
}

export function event(event, selector, method) {
    return new EventExpression(event, selector, method);
}

export function ref(selector, field) {
    return new RefExpression(selector, field);
}

export function component(selector) {
    return new ComponentExpression(selector);
}

export function list(selector: string, prop: string, itemTemplateExpressions: TemplateExpression[]) {
    return new ListExpression(selector, prop, itemTemplateExpressions);
}
