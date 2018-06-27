import {getElementByPath} from "../dom.helpers";
import {TextExpressionMetadata} from "../compiler/text.expression";
import {ExpressionBinding} from "./linker";

export class TextExpressionLinker {
    link(host: HTMLElement, expr: TextExpressionMetadata, component, context): TextExpressionBinding {
        console.log("Linking text \"" + expr.prop + "\" to context", context);

        const element = getElementByPath(host, expr.path);
        return new TextExpressionBinding(element, expr, component, context);
    }

    unlink() {
    }
}

export class TextExpressionBinding extends ExpressionBinding {
    prevValue: any;

    constructor(public element: HTMLElement,
                public metadata: TextExpressionMetadata,
                component,
                context) {
        super(component, context);
    }

    update(context: any) {
        const value = context[this.metadata.prop];
        if(this.prevValue == value) {
            return;
        }

        console.log("Updating node text \"" + this.prevValue + "\" with value \"" + value + "\" from context", context);

        this.element.innerText = value;
        this.prevValue = value;
    }

    unlink() {
    }
}
