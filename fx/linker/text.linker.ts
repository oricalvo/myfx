import {getElementByPath} from "../dom.helpers";
import {TextExpressionMetadata} from "../compiler/text.expression";
import {ExpressionBinding} from "./linker";

export class TextExpressionLinker {
    link(host: HTMLElement, expr: TextExpressionMetadata, component, context): TextExpressionBinding {
        console.log("Linking text expression", expr.prop, "to component", component);

        const element = getElementByPath(host, expr.path);
        return new TextExpressionBinding(element, expr, component, context);
    }

    unlink() {
    }
}

export class TextExpressionBinding implements ExpressionBinding {
    constructor(private element: HTMLElement,
                private expr: TextExpressionMetadata,
                private component,
                private context) {
    }

    update() {
        const value = this.context[this.expr.prop];
        console.log("Updating text expression", this.expr.prop, "for component", this.component, "with value", value);

        this.element.innerText = value;
    }

    unlink() {
    }
}
