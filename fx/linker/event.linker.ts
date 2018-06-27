import {EventExpressionMetadata} from "../compiler/event.expression";
import {getElementByPath} from "../dom.helpers";
import {ExpressionBinding} from "./linker";

export class EventExpressionLinker {
    link(host: Element, expr: EventExpressionMetadata, component, context): EventExpressionBinding {
        console.log("Linking event \"" + expr.event + "\" to \"" + component.constructor.name + "." + expr.method + "\"");

        const element = getElementByPath(host, expr.path);

        return new EventExpressionBinding(element, expr, component, context);
    }
}

export class EventExpressionBinding extends ExpressionBinding {
    listener;

    constructor(public element: HTMLElement,
                public expr: EventExpressionMetadata,
                component,
                context) {
        super(component, context);

        this.listener = (event) => {
            component[expr.method](event, this.context);
        }

        element.addEventListener(expr.event, this.listener);
    }

    unlink() {
        this.element.removeEventListener(this.expr.event, this.listener);
    }
}
