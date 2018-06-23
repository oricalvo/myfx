import {registerComponentType} from "../registry";

export interface TemplateExpression {
    compile(template: HTMLElement): TemplateExpressionMetadata;
}

export enum TemplateExpressionType {
    Text = "Text",
    Event = "Event",
    Component = "Component",
    List = "List",
}

export interface TemplateExpressionMetadata {
    type: TemplateExpressionType;
}

export interface ComponentMetadata {
    name: string;
    template: string;
    compiledTemplate: HTMLElement;
    styles: string;
    bindings: TemplateExpression[];
    compiledBindings: TemplateExpressionMetadata[];
}

export interface ComponentType {
    metadata: ComponentMetadata;
}

export interface CompileTemplateResult {
    template: string;
    expressions: TemplateExpressionMetadata[];
}

function compileComponent(componentType: ComponentType) {
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

export function compileTemplate(template: string, bindings: TemplateExpression[]): CompileTemplateResult {
    const cont = document.createElement("fs-template");
    cont.innerHTML = template;
    const compiledTemplate: HTMLElement = <any>cont.childNodes[0];

    const compiledExpressions: TemplateExpressionMetadata[] = [];
    for (const expr of bindings) {
        const bindingMetadata = expr.compile(compiledTemplate);
        compiledExpressions.push(bindingMetadata);
    }

    return {
        template: compiledTemplate.outerHTML,
        expressions: compiledExpressions,
    };
}

export function compileAllComponents(components) {
    for(const component of components) {
        compileComponent(component);
    }
}
