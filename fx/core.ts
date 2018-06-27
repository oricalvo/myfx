// import {getAllComponents} from "./registry";
import {compileAllComponents, TemplateExpressionMetadata, TemplateExpressionType} from "./compiler/compiler";
import {TextExpressionLinker} from "./linker/text.linker";
import {ExpressionLinker} from "./linker/linker";
import {EventExpressionLinker} from "./linker/event.linker";
import {registerComponentType} from "./registry";
import {ComponentExpressionLinker} from "./linker/component.linker";
import {ListExpressionLinker} from "./linker/list.linker";
import {linkers} from "./linker/linkers";

const instances = [];

export function mount(element, component) {
    if(!element) {
        throw new Error("element parameter must be non empty");
    }

    element.innerHTML = component.metadata.compiledTemplate.innerHTML;

    const instance = new component();

    linkComponent(element, instance);

    updateComponent(instance);

    instances.push(instance);
}

export async function init(comps) {
    for(const comp of comps) {
        registerComponentType(comp.metadata.name, comp);
    }

    compileAllComponents(comps);
}

export function getExpressionLinker(exprType: TemplateExpressionType): ExpressionLinker {
    const linker = linkers[exprType];
    if(!linker) {
        throw new Error("No expression linker found of type " + exprType);
    }

    return linker;
}

function linkComponent(element, component) {
    console.log("linkComponent", element, component);

    component.bindings = [];
    component.element = element;

    const expressions: TemplateExpressionMetadata[] = component.constructor.metadata.compiledBindings;
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
