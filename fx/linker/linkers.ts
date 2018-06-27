import {TemplateExpressionType} from "../compiler/compiler";
import {TextExpressionLinker} from "./text.linker";
import {EventExpressionLinker} from "./event.linker";
import {ComponentExpressionLinker} from "./component.linker";
import {ListExpressionLinker} from "./list.linker";
import {RefExpressionLinker} from "./ref.linker";

export const linkers = {
    [TemplateExpressionType.Text]: new TextExpressionLinker(),
    [TemplateExpressionType.Event]: new EventExpressionLinker(),
    [TemplateExpressionType.Component]: new ComponentExpressionLinker(),
    [TemplateExpressionType.List]: new ListExpressionLinker(),
    [TemplateExpressionType.Ref]: new RefExpressionLinker(),
};
