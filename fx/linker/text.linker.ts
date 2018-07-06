import {getElementByPath} from "../dom.helpers";
import {TextExpressionMetadata} from "../compiler/text.expression";
import {ExpressionBinding} from "./linker";
import {registry} from "../registry";
import {parse} from "../parser";

export class TextExpressionLinker {
    link(host: HTMLElement, metadata: TextExpressionMetadata, component, context): TextExpressionBinding {
        console.log("Linking text \"" + metadata.expr + "\" to context", context);

        metadata.exprFn = parse(metadata.expr);

        if(metadata.formatterIndex!=-1 && !metadata.formatter) {
            metadata.formatter = registry.formatters.getTypeByIndex(metadata.formatterIndex);
        }

        const element = getElementByPath(host, metadata.path);
        return new TextExpressionBinding(element, metadata, component, context);
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
        const value = this.metadata.exprFn(context);
        if(this.prevValue == value) {
            return;
        }

        // console.log("Updating node text \"" + this.prevValue + "\" with value \"" + value + "\" from context", context);

        this.element.innerText = this.metadata.formatter ? this.metadata.formatter(value, this.metadata.formatterArgs) : value;
        this.prevValue = value;
    }

    unlink() {
    }
}
