import {EventExpressionMetadata} from "../compiler/event.expression";
import {getElementByPath} from "../dom.helpers";
import {ExpressionBinding} from "./linker";

export class EventExpressionLinker {
    link(host: Element, expr: EventExpressionMetadata, component, context): EventExpressionBinding {
        console.log("Linking event expression", expr.event, "to component", component);

        const element = getElementByPath(host, expr.path);

        return new EventExpressionBinding(element, expr, component);
    }
}

export class EventExpressionBinding implements ExpressionBinding {
    listener;

    constructor(private element: HTMLElement,
                private expr: EventExpressionMetadata,
                private component) {

        this.listener = function() {
            component[expr.method]();
        }

        element.addEventListener(expr.event, this.listener);
    }

    update() {
    }

    unlink() {
        this.element.removeEventListener(this.expr.event, this.listener);
    }
}
