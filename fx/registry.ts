export class TypeRegistry {
    private types = [];
    private nameToIndex = {};
    private nameToClass = {};

    constructor() {
    }

    register(type) {
        const {metadata} = type;
        if(!metadata) {
            throw new Error("Type " + type.name + " has no metadata");
        }

        const {name} = metadata;
        if(!name) {
            throw new Error("metadata is missing a name");
        }

        metadata.events = metadata.events || [];
        metadata.properties = metadata.properties || [];

        this.types.push(type);
        this.nameToClass[name] = type;
        this.nameToIndex[name] = this.types.length - 1;
    }

    getTypeByName(name: string) {
        const comp = this.nameToClass[name];
        if(!comp) {
            throw new Error("Component with name " + name + " was not found");
        }

        return comp;
    }

    getTypeByIndex(index: number) {
        const type = this.types[index];
        if(!type) {
            throw new Error("Type for index " + index + " was not found");
        }

        return type;
    }

    getIndexByName(name: string): number {
        const index = this.nameToIndex[name];
        if(index === undefined) {
            throw new Error("Type with name " + name + " was not found");
        }

        return index;
    }

    getAll() {
        return this.types;
    }
}

export const registry = {
    components: new TypeRegistry(),
    formatters: new TypeRegistry(),
};
