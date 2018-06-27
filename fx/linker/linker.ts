import {TemplateExpressionMetadata} from "../compiler/compiler";

export interface ExpressionLinker {
    link(host: HTMLElement, expr: TemplateExpressionMetadata, component: any, context: any): ExpressionBinding;
}

export abstract class ExpressionBinding {
    constructor(public component: any, public context: any) {
    }

    update(context: any) {
        this.context = context;
    }

    unlink() {
    }
}


