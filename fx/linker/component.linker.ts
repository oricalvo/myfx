import {ComponentExpressionMetadata} from "../compiler/component.expression";
import {getElementByPath} from "../dom.helpers";
import {mount} from "../core";
import {getComponentTypeByIndex, getComponentTypeByName, getComponentTypeIndex} from "../registry";
import {ExpressionBinding} from "./linker";

export class ComponentExpressionLinker {
    constructor() {
    }

    link(host: Element, expr: ComponentExpressionMetadata, component, context) {
        const element = getElementByPath(host, expr.path);
        return new ComponentExpressionBinding(element, expr, component, context);
    }
}

export class ComponentExpressionBinding extends ExpressionBinding {
    mountedComponent;

    constructor(public element, public metadata: ComponentExpressionMetadata, component, context) {
        super(component, context);

        const compType = getComponentTypeByIndex(metadata.componentIndex);
        this.mountedComponent = mount(element, compType);

        if(metadata.events) {
            for (const event of metadata.events) {
                const index = compType.metadata.events.indexOf(event.source);
                if (index == -1) {
                    throw new Error("Event " + event.source + " does not exist on component of type " + compType.name);
                }
            }
        }

        if(this.metadata.properties) {
            for (const prop of metadata.properties) {
                const index = compType.metadata.properties.indexOf(prop.source);
                if (index == -1) {
                    throw new Error("Event " + prop.source + " does not exist on component of type " + compType.name);
                }
            }
        }
    }

    update(context: any) {
    }
}
