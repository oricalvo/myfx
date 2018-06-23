"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_expression_1 = require("./text.expression");
const event_expression_1 = require("./event.expression");
const component_expression_1 = require("./component.expression");
const list_expression_1 = require("./list.expression");
function text(selector, prop) {
    return new text_expression_1.TextExpression(this.template, selector, prop);
}
exports.text = text;
function event(event, selector, method) {
    return new event_expression_1.EventExpression(event, selector, method);
}
exports.event = event;
function component(selector) {
    return new component_expression_1.ComponentExpression(selector);
}
exports.component = component;
function list(selector, prop, itemTemplateExpressions) {
    return new list_expression_1.ListExpression(selector, prop, itemTemplateExpressions);
}
exports.list = list;
//# sourceMappingURL=expressions.js.map