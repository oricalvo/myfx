"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components = [];
const nameToIndex = {};
const nameToClass = {};
function registerComponent(name, comp) {
    components.push(comp);
    nameToClass[name] = comp;
    nameToIndex[name] = components.length;
}
exports.registerComponent = registerComponent;
function getComponentByName(name) {
    const comp = nameToClass[name];
    if (!comp) {
        throw new Error("Component with name " + name + " was not found");
    }
    return comp;
}
exports.getComponentByName = getComponentByName;
function getComponentIndex(name) {
    const index = nameToIndex[name];
    if (index === undefined) {
        throw new Error("Component with name " + name + " was not found");
    }
    return index;
}
exports.getComponentIndex = getComponentIndex;
function getAllComponents() {
    return components;
}
exports.getAllComponents = getAllComponents;
//# sourceMappingURL=registry.js.map