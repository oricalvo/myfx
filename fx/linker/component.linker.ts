import {ComponentExpressionMetadata} from "../compiler/component.expression";
import {getElementByPath} from "../dom.helpers";
import {mount} from "../core";
import {getComponentTypeByIndex, getComponentTypeByName, getComponentTypeIndex} from "../registry";

export class ComponentExpressionLinker {
    constructor() {
    }

    link(host: Element, expr: ComponentExpressionMetadata, component, context) {
        const element = getElementByPath(host, expr.path);
        return new ComponentExpressionBinding(element, expr, component);
    }
}

export class ComponentExpressionBinding {
    mountedComponent;

    constructor(private element, private expr: ComponentExpressionMetadata, private component) {
        const compType = getComponentTypeByIndex(expr.componentIndex);
        this.mountedComponent = mount(element, compType);
    }

    update() {
    }

    unlink() {
    }
}
