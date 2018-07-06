import {TextExpression} from "./text.expression";
import {EventExpression} from "./event.expression";
import {ComponentExpression} from "./component.expression";
import {ListExpression} from "./list.expression";
import {TemplateExpression} from "./compiler";
import {RefExpression} from "./ref.expression";

export function text(selector: string, prop: string, formatter?: string, formatterArgs?: any) {
    return new TextExpression(this.template, selector, prop, formatter, formatterArgs);
}

export function event(event, selector, method) {
    return new EventExpression(event, selector, method);
}

export function ref(selector, field) {
    return new RefExpression(selector, field);
}

export interface ComponentExpressionOptions {
    properties?: any[];
    events?: any[];
}

export function component(selector, options?: ComponentExpressionOptions) {
    return new ComponentExpression(
        selector,
        options && options.properties,
        options && options.events);
}

export function list(selector: string, prop: string, itemTemplateExpressions: TemplateExpression[]) {
    return new ListExpression(selector, prop, itemTemplateExpressions);
}
//
// export type Expression =
//     ListExpression|
//     RefExpression|
//     ComponentExpression|
//     TextExpression|
//     EventExpression;
