"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components = [];
const nameToIndex = {};
const nameToClass = {};
function registerComponentType(name, comp) {
    components.push(comp);
    nameToClass[name] = comp;
    nameToIndex[name] = components.length - 1;
}
exports.registerComponentType = registerComponentType;
function getComponentTypeByName(name) {
    const comp = nameToClass[name];
    if (!comp) {
        throw new Error("Component with name " + name + " was not found");
    }
    return comp;
}
exports.getComponentTypeByName = getComponentTypeByName;
function getComponentTypeByIndex(index) {
    const compType = components[index];
    if (!compType) {
        throw new Error("Component type for index " + index + " was not found");
    }
    return compType;
}
exports.getComponentTypeByIndex = getComponentTypeByIndex;
function getComponentTypeIndex(name) {
    const index = nameToIndex[name];
    if (index === undefined) {
        throw new Error("Component with name " + name + " was not found");
    }
    return index;
}
exports.getComponentTypeIndex = getComponentTypeIndex;
//# sourceMappingURL=registry.js.map