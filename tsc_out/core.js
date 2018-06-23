"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("./registry");
const compiler_1 = require("./compiler/compiler");
const instances = [];
function mount(element, component) {
    element.innerHTML = component.metadata.compiledTemplate.innerHTML;
    const instance = new component();
    linkComponent(element, instance);
    updateComponent(instance);
    instances.push(instance);
}
exports.mount = mount;
async function init(comps) {
    compiler_1.compileAllComponents(registry_1.getAllComponents());
}
exports.init = init;
function linkComponent(element, instance) {
    console.log("linkComponent", element, instance);
    instance.bindings = [];
    instance.element = element;
    for (const binding of instance.constructor.metadata.bindings) {
        const link = binding.link(element, instance, instance);
        if (link) {
            instance.bindings.push(link);
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