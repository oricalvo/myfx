import {EventExpressionMetadata} from "../compiler/event.expression";
import {getElementByPath} from "../dom.helpers";
import {ExpressionBinding} from "./linker";
import {RefExpressionMetadata} from "../compiler/ref.expression";

export class RefExpressionLinker {
    link(host: Element, expr: RefExpressionMetadata, component, context): RefExpressionBinding {
        console.log("Linking ref expression", expr.field);

        const element = getElementByPath(host, expr.path);

        return new RefExpressionBinding(element, expr, component, context);
    }
}

export class RefExpressionBinding extends ExpressionBinding {
    listener;

    constructor(public element: HTMLElement,
                public expr: RefExpressionMetadata,
                component,
                context) {
        super(component, context);

        component[expr.field] = element;
    }

    unlink() {
        delete this.component[this.expr.field];
    }
}
