const components = [];
const nameToIndex = {};
const nameToClass = {};

export function registerComponentType(name, comp) {
    components.push(comp);
    nameToClass[name] = comp;
    nameToIndex[name] = components.length - 1;
}

export function getComponentTypeByName(name) {
    const comp = nameToClass[name];
    if(!comp) {
        throw new Error("Component with name " + name + " was not found");
    }

    return comp;
}

export function getComponentTypeByIndex(index: number) {
    const compType = components[index];
    if(!compType) {
        throw new Error("Component type for index " + index + " was not found");
    }

    return compType;
}

export function getComponentTypeIndex(name): number {
    const index = nameToIndex[name];
    if(index === undefined) {
        throw new Error("Component with name " + name + " was not found");
    }

    return index;
}
