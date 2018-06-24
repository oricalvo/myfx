"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateExpressionType;
(function (TemplateExpressionType) {
    TemplateExpressionType["Text"] = "Text";
    TemplateExpressionType["Event"] = "Event";
    TemplateExpressionType["Component"] = "Component";
    TemplateExpressionType["List"] = "List";
})(TemplateExpressionType = exports.TemplateExpressionType || (exports.TemplateExpressionType = {}));
function compileComponent(componentType) {
    const metadata = componentType.metadata;
    const compiledTemplate = document.createElement(metadata.name);
    compiledTemplate.innerHTML = metadata.template;
    componentType.metadata.compiledTemplate = compiledTemplate;
    metadata.compiledBindings = [];
    for (const expr of metadata.bindings) {
        const bindingMetadata = expr.compile(compiledTemplate);
        metadata.compiledBindings.push(bindingMetadata);
    }
}
function compileTemplate(template, bindings) {
    const cont = document.createElement("fs-template");
    cont.innerHTML = template;
    const compiledTemplate = cont.childNodes[0];
    const compiledExpressions = [];
    for (const expr of bindings) {
        const bindingMetadata = expr.compile(compiledTemplate);
        compiledExpressions.push(bindingMetadata);
    }
    return {
        template: compiledTemplate.outerHTML,
        expressions: compiledExpressions,
    };
}
exports.compileTemplate = compileTemplate;
function compileAllComponents(components) {
    for (const component of components) {
        compileComponent(component);
    }
}
exports.compileAllComponents = compileAllComponents;
//# sourceMappingURL=compiler.js.map