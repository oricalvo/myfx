"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_helpers_1 = require("../dom.helpers");
class ListExpressionLinker {
    constructor(metadata) {
        this.metadata = metadata;
    }
    link(host) {
        this.placeholder = dom_helpers_1.getElementByPath(host, this.metadata.path);
    }
    unlink() {
    }
    update(instance, context) {
        // this.clean();
        //
        // this.elements = [];
        // this.itemBindings = [];
        //
        // const parent = this.placeholder.parentElement;
        // const collection = instance[this.metadata.prop];
        // const collAsArray: any[] = Array.from(collection);
        // const placeholderIndex = this.metadata.path[this.metadata.path.length-1];
        // const placeholderParent = this.placeholder.parentElement;
        // if(collection) {
        //     for(let i=collAsArray.length-1; i>=0; i--) {
        //         const item = collAsArray[i];
        //         this.placeholder.insertAdjacentHTML("afterend", this.metadata.template);
        //         const clone = placeholderParent[placeholderIndex+1];
        //         for(const expr of this.metadata.expressions) {
        //             const linker = getExpressionLinker(expr);
        //             const link = linker.link(clone, instance, item);
        //             if(link) {
        //                 this.itemBindings.push(link);
        //                 link.update(instance, item);
        //             }
        //         }
        //     }
        // }
    }
    clean() {
        if (this.elements) {
            for (const element of this.elements) {
                element.parentElement.removeChild(element);
            }
            this.elements = [];
        }
    }
}
exports.ListExpressionLinker = ListExpressionLinker;
//# sourceMappingURL=list.binding.js.map