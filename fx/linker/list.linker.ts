import {ListExpressionMetadata} from "../compiler/list.expression";
import {getElementByPath} from "../dom.helpers";
import {EventExpressionMetadata} from "../compiler/event.expression";
import {getExpressionLinker} from "../core";

export class ListExpressionLinker {
    constructor() {
    }

    link(host: Element, expr: ListExpressionMetadata, component, context) {
        const placeholder = getElementByPath(host, expr.path);

        return new ListExpressionBinding(placeholder, expr, component);
    }

    unlink() {
    }

    update(instance, context) {
    }
}

export class ListExpressionBinding {
    elements: Node[];
    itemBindings: any[];

    constructor(private placeholder: Element, private expr: ListExpressionMetadata, private component) {
    }

    update() {
        this.clean();

        this.elements = [];
        this.itemBindings = [];

        const collection = this.component[this.expr.prop];
        const collAsArray: any[] = Array.from(collection);
        const placeholderIndex = this.expr.path[this.expr.path.length-1];
        const placeholderParent = this.placeholder.parentElement;

        if(collection) {
            for(let i=0; i<collAsArray.length; i++) {
                const item = collAsArray[i];
                insertBefore(this.placeholder, this.expr.template);
                const clone = this.placeholder.previousSibling;
                for(const expr of this.expr.expressions) {
                    const linker = getExpressionLinker(expr.type);
                    const binding = linker.link(<any>clone, expr, item);
                    this.itemBindings.push(binding);
                    binding.update();
                }
            }
        }
    }

    clean() {
        if(this.elements) {
            for (const element of this.elements) {
                element.parentElement.removeChild(element);
            }

            this.elements = [];
        }
    }

    unlink() {
    }
}

function insertBefore(ref, template) {
    const cont = document.createElement("cont");
    cont.innerHTML = template;
    ref.parentElement.insertBefore(cont.childNodes[0], ref);
}
