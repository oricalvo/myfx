import {ListExpressionMetadata} from "../compiler/list.expression";
import {getElementByPath, insertBefore} from "../dom.helpers";
import {getExpressionLinker} from "../core";
import {ExpressionBinding} from "./linker";
import {createLogger} from "../logger";

const logger = createLogger("ListExpressionLinker");

export class ListExpressionLinker {
    constructor() {
    }

    link(host: Element, expr: ListExpressionMetadata, component, context) {
        const placeholder = getElementByPath(host, expr.path);

        return new ListExpressionBinding(placeholder, expr, component, context);
    }
}

export class ListExpressionBinding extends ExpressionBinding {
    elements: Node[];
    bindings: ExpressionBinding[];
    items: any[];

    constructor(public placeholder: Element, public metadata: ListExpressionMetadata, component, context) {
        super(component, context);
    }

    update(context: any) {
        super.update(context);

        const exprLength = this.metadata.expressions.length;

        this.items = Array.from(this.context[this.metadata.prop] || []);
        this.elements = this.elements || [];
        this.bindings = this.bindings || [];

        //
        //  Remove old elements
        //
        if(this.items.length < this.elements.length) {
            for (let i = this.items.length; i < this.elements.length; i++) {
                const element = this.elements[i];
                element.parentElement.removeChild(element);

                for (let j = i * exprLength; j < (i + 1) * exprLength; j++) {
                    this.bindings[j].unlink();
                }
            }

            this.bindings.splice(this.items.length * exprLength);
            this.elements.splice(this.items.length);
        }

        //
        //  Create new elements
        //
        if(this.items.length > this.elements.length) {
            for (let i = this.elements.length; i < this.items.length; i++) {
                const item = this.items[i];
                const element = insertBefore(this.placeholder, this.metadata.template);
                this.linkElementToItem(element, item);
            }
        }

        //
        //  Updating all bindings
        //
        for(let i=0; i<this.items.length; i++) {
            const item = this.items[i];

            for (let j = i * exprLength; j < (i + 1) * exprLength; j++) {
                const binding = this.bindings[j];
                binding.update(item);
            }
        }
    }

    private linkElementToItem(element, item) {
        this.elements.push(element);

        for(const expr of this.metadata.expressions) {
            const linker = getExpressionLinker(expr.type);
            const binding = linker.link(<any>element, expr, this.component, item);
            this.bindings.push(binding);
        }
    }

    clean() {
        if(this.bindings) {
            for(const binding of this.bindings) {
                binding.unlink();
            }

            this.bindings = [];
        }

        if(this.elements) {
            for (const element of this.elements) {
                element.parentElement.removeChild(element);
            }

            this.elements = [];
        }
    }

    unlink() {
        this.clean();
    }
}
