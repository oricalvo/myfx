"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {getAllComponents} from "./registry";
const compiler_1 = require("./compiler/compiler");
const text_linker_1 = require("./linker/text.linker");
const event_linker_1 = require("./linker/event.linker");
const registry_1 = require("./registry");
const component_binding_1 = require("./linker/component.binding");
const list_linker_1 = require("./linker/list.linker");
const instances = [];
function mount(element, component) {
    if (!element) {
        throw new Error("element parameter must be non empty");
    }
    element.innerHTML = component.metadata.compiledTemplate.innerHTML;
    const instance = new component();
    linkComponent(element, instance);
    updateComponent(instance);
    instances.push(instance);
}
exports.mount = mount;
async function init(comps) {
    for (const comp of comps) {
        registry_1.registerComponentType(comp.metadata.name, comp);
    }
    compiler_1.compileAllComponents(comps);
}
exports.init = init;
const linkers = {
    [compiler_1.TemplateExpressionType.Text]: new text_linker_1.TextExpressionLinker(),
    [compiler_1.TemplateExpressionType.Event]: new event_linker_1.EventExpressionLinker(),
    [compiler_1.TemplateExpressionType.Component]: new component_binding_1.ComponentExpressionLinker(),
    [compiler_1.TemplateExpressionType.List]: new list_linker_1.ListExpressionLinker(),
};
function getExpressionLinker(exprType) {
    const linker = linkers[exprType];
    if (!linker) {
        throw new Error("No expression linker found of type " + exprType);
    }
    return linker;
}
exports.getExpressionLinker = getExpressionLinker;
function linkComponent(element, component) {
    console.log("linkComponent", element, component);
    component.bindings = [];
    component.element = element;
    const expressions = component.constructor.metadata.compiledBindings;
    for (const expr of expressions) {
        const linker = getExpressionLinker(expr.type);
        const binding = linker.link(element, expr, component, component);
        if (binding) {
            component.bindings.push(binding);
        }
    }
}
function updateComponent(instance) {
    for (const binding of instance.bindings) {
        binding.update(instance, instance);
    }
}
function update(instance) {
    if (instance) {
        updateComponent(instance);
        return;
    }
    for (const instance of instances) {
        updateComponent(instance);
    }
}
exports.update = update;
//# sourceMappingURL=core.js.map