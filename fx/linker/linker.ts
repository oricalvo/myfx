import {TemplateExpressionMetadata} from "../compiler/compiler";

export interface ExpressionLinker {
    link(host: HTMLElement, expr: TemplateExpressionMetadata, component: any, context: any): ExpressionBinding;
}

export interface ExpressionBinding {
    update();
    unlink();
}


