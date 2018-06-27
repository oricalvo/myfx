import {EventExpressionMetadata} from "../compiler/event.expression";
import {getElementByPath} from "../dom.helpers";
import {ExpressionBinding} from "./linker";
import {RefExpressionMetadata} from "../compiler/ref.expression";

export class RefExpressionLinker {
    link(host: Element, expr: RefExpressionMetadata, component, context): RefExpressionBinding {
        console.log("Linking ref expression", expr.field);

        const element = getElementByPath(host, expr.path);

        return new RefExpressionBinding(element, expr, component);
    }
}

export class RefExpressionBinding implements ExpressionBinding {
    listener;

    constructor(private element: HTMLElement,
                private expr: RefExpressionMetadata,
                private component) {

        component[expr.field] = element;
    }

    update() {
    }

    unlink() {
        delete this.component[this.expr.field];
    }
}
