"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compileComponent(component) {
    const compiledTemplate = document.createElement(component.metadata.name);
    compiledTemplate.innerHTML = component.metadata.template;
    const binder = new Bindings(compiledTemplate);
    component.bind(binder);
    component.metadata.bindings = binder.bindings;
    component.metadata.compiledTemplate = compiledTemplate;
}
function compileAllComponents(components) {
    for (const component of components) {
        compileComponent(component);
    }
}
exports.compileAllComponents = compileAllComponents;
//# sourceMappingURL=compiler.js.map