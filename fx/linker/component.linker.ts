import {ComponentExpressionMetadata} from "../compiler/component.expression";
import {getElementByPath} from "../dom.helpers";
import {mount} from "../core";
import {ExpressionBinding} from "./linker";
import {registry} from "../registry";
import {EventEmitter} from "../eventEmitter";

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
    mountedComponentType;

    constructor(public element,
                public metadata: ComponentExpressionMetadata,
                component,
                context) {
        super(component, context);

        const compType = this.mountedComponentType = registry.components.getTypeByIndex(metadata.componentIndex);
        this.mountedComponent = mount(element, compType);

        this.validateMetadata(metadata);

        for (const event of this.metadata.events) {
            const compEvent: EventEmitter = this.mountedComponent[event.source];
            compEvent.subscribe(this.component[event.target].bind(this.component));
        }
    }

    update(context: any) {
        const compType = this.mountedComponentType;

        for (const prop of this.metadata.properties) {
            this.mountedComponent[prop.target] = prop.source ? context[prop.source] : context;
        }
    }

    private validateMetadata(metadata: ComponentExpressionMetadata) {
        const compType = this.mountedComponentType;

        if (metadata.events && !compType.metadata.events) {
            throw new Error("Component " + compType.name + " has no events");
        }

        for (const event of metadata.events) {
            const index = compType.metadata.events.indexOf(event.source);
            if (index == -1) {
                throw new Error("Event " +
                    event.source + " does not exist on component of type " + compType.name);
            }
        }

        if (metadata.properties && !compType.metadata.properties) {
            throw new Error("Component " + compType.name + " has no properties");
        }

        for (const prop of metadata.properties) {
            if (prop.source) {
                const index = compType.metadata.properties.indexOf(prop.source);
                if (index == -1) {
                    throw new Error("Property " + prop.source + " does not exist on component of type " + compType.name);
                }
            }
        }
    }
}
