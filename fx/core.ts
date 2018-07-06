import {compileAllComponents, TemplateExpressionMetadata, TemplateExpressionType} from "./compiler/compiler";
import {ExpressionLinker} from "./linker/linker";
import {linkers} from "./linker/linkers";
import {registry} from "./registry";
import {EventEmitter} from "./eventEmitter";

const instances = [];

export function mount(element, component): object {
    if(!element) {
        throw new Error("element parameter must be non empty");
    }

    element.innerHTML = component.metadata.compiledTemplate.innerHTML;

    const instance = new component();

    linkComponent(element, instance);

    // updateComponent(instance);

    instances.push(instance);

    return instance;
}

export async function init(types) {
    for(const type of types) {
        const {metadata} = type;
        if(!metadata) {
            throw new Error("No metadata found for type " + type.name);
        }

        if(metadata.type == "component") {
            registry.components.register(type);
        }
        else if(metadata.type == "formatter") {
            registry.formatters.register(type);
        }
        else {
            throw new Error("Unknown metadata type: " + metadata.type);
        }
    }

    compileAllComponents();
}

export function getExpressionLinker(exprType: TemplateExpressionType): ExpressionLinker {
    const linker = linkers[exprType];
    if(!linker) {
        throw new Error("No expression linker found of type " + exprType);
    }

    return linker;
}

function linkComponent(element, component) {
    const {metadata} = component.constructor;

    console.log("linkComponent", element, component, metadata);

    for(const event of metadata.events) {
        component[event] = new EventEmitter();
    }

    component.bindings = [];
    component.element = element;


    const expressions: TemplateExpressionMetadata[] = metadata.compiledBindings;
    for(const expr of expressions) {
        const linker = getExpressionLinker(expr.type);
        const binding = linker.link(element, expr, component, component);
        if(binding) {
            component.bindings.push(binding);
        }
    }
}

function updateComponent(instance) {
    for(const binding of instance.bindings) {
        binding.update(instance, instance);
    }
}

export function update(instance?) {
    if(instance) {
        updateComponent(instance);
        return;
    }

    for(const instance of instances) {
        updateComponent(instance);
    }
}
