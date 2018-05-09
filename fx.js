const components = [];
const componentsMap = {};
const instances = [];

export function mount(element, component) {
    element.innerHTML = component.metadata.template.innerHTML;

    const instance = new component();

    linkComponent(element, instance);

    updateComponent(instance);

    instances.push(instance);
}

export async function init(comps) {
    await Promise.all(comps.map(c => prepareComponent(c)));

    for(const component of components) {
        compileComponent(component);
    }
}

async function prepareComponent(component) {
    console.log("prepareComponent", component.metadata.name);

    if(componentsMap[component.metadata.name]) {
        throw new Error("Component with name " + c.name + " already exists");
    }

    components.push(component);
    componentsMap[component.metadata.name] = component;

    await Promise.all([
        resolveComponentAsset(component, "template"),
        resolveComponentAsset(component, "styles"),
    ]);
}

function compileComponent(component) {
    const template = document.createElement(component.metadata.name);
    template.innerHTML = component.metadata.templateText;
    const binder = new Binder(template);
    component.bind(binder);
    component.metadata.bindings = binder.bindings;
    component.metadata.template = template;
}

async function resolveComponentAsset(component, fieldName) {
    if (component.metadata[fieldName]) {
        return;
    }

    const url = component.metadata[fieldName + "Url"];
    if (url) {
        const res = await fetch(url);
        const text = await res.text();
        component.metadata[fieldName + "Text"] = text;
        return;
    }

    throw new Error("Component has no " + fieldName);
}


async function fixComponent(component, options) {
    const res = await fetch(options.templateUrl);
    const text = await res.text();
    component.template = text;
}

function linkComponent(element, instance) {
    console.log("linkComponent", element, instance);

    instance.bindings = [];
    instance.element = element;

    for(const binding of instance.constructor.metadata.bindings) {
        const link = binding.link(element, instance, instance);
        if(link) {
            instance.bindings.push(link);
        }
    }
}

function updateComponent(instance) {
    for(const binding of instance.bindings) {
        binding.update(instance, instance);
    }
}

function getComponentByName(name) {
    const comp = componentsMap[name];
    if(!comp) {
        throw new Error("Component with name " + name + " was not found");
    }

    return comp;
}

function getElementBySelector(parent, selector) {
    const element = parent.querySelector(selector);
    if(!element) {
        throw new Error("Selector " + selector + " was not found");
    }

    return element;
}

function getElementByPath(root, path) {
    let current = root;

    for(let i=path.length-1; i>=0; i--) {
        const index = path[i];
        current = current.childNodes[index];
        if(!current) {
            throw new Error("Failed to resolve path. Index " + index + " was not found");
        }
    }

    return current;
}

function getElementPath(root, element) {
    const path = [];

    while(true) {
        if(element == root) {
            break;
        }

        const parent = element.parentNode;
        const index = getElementIndex(parent, element);
        if (index == -1) {
            throw new Error("Element was not found inside its parent");
        }
        path.push(index);

        element = parent;
    }

    return path;
}

function getElementIndex(parent, element) {
    const nodes = parent.childNodes;
    for(let i=0; i<nodes.length; i++) {
        const child = nodes[i];
        if(child == element) {
            return i;
        }
    }

    return -1;
}

export function update(instance) {
    if(instance) {
        updateComponent(instance);
        return;
    }

    for(const instance of instances) {
        updateComponent(instance);
    }
}

class Binder {
    constructor(template) {
        this.template = template;
        this.bindings = [];
    }

    text(selector, prop) {
        this.bindings.push(new TextBindingMetadata(this.template, selector, prop));
    }

    event(event, selector, method) {
        this.bindings.push(new EventBindingMetadata(event, this.template, selector, method));
    }

    component(selector) {
        this.bindings.push(new ComponentBindingMetadata(this.template, selector));
    }

    list(selector, prop, itemBinderCallback) {
        this.bindings.push(new ListBindingMetadata(this.template, selector, prop, itemBinderCallback));
    }
}

class TextBinding {
    constructor(metadata, host, instance, context) {
        this.metadata = metadata;

        this.element = getElementByPath(host, this.metadata.path);
    }

    update(instance, context) {
        this.element.innerText = context[this.metadata.prop];
    }
}

class TextBindingMetadata {
    constructor(template, selector, prop) {
        const element = getElementBySelector(template, selector);
        this.selector = selector;
        this.path = getElementPath(template, element);
        this.prop = prop;
    }

    link(host, instance, context) {
        return new TextBinding(this, host, instance, context);
    }
}

class EventBinding {
    constructor(metadata, host, instance, context) {
        this.metadata = metadata;

        this.element = getElementByPath(host, this.metadata.path);

        this.element.addEventListener(this.metadata.event, (event) => {
            instance[this.metadata.method].call(instance, event, context);
        });
    }

    update(instance) {
    }
}

class EventBindingMetadata {
    constructor(event, template, selector, method) {
        const element = getElementBySelector(template, selector);
        this.event = event;
        this.selector = selector;
        this.path = getElementPath(template, element);
        this.method = method;
    }

    link(host, instance, context) {
        return new EventBinding(this, host, instance, context);
    }
}

class ListBinding {
    constructor(metadata, host, instance, context) {
        this.metadata = metadata;
        this.placeholder = getElementByPath(host, this.metadata.path);
    }

    update(instance, context) {
        this.clean();

        this.elements = [];
        this.itemBindings = [];

        const parent = this.placeholder.parentElement;
        const collection = instance[this.metadata.prop];
        if(collection) {
            for (const item of collection) {
                const clone = this.metadata.template.cloneNode(true);
                parent.insertBefore(clone, this.placeholder);
                this.elements.push(clone);

                for(const binding of this.metadata.itemBindings) {
                    const link = binding.link(clone, instance, item);
                    if(link) {
                        this.itemBindings.push(link);
                        link.update(instance, item);
                    }
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
}

class ListBindingMetadata {
    constructor(template, selector, prop, itemBinderCallback) {
        this.template = getElementBySelector(template, selector);
        this.selector = selector;
        this.path = getElementPath(template, this.template);
        this.prop = prop;

        const parent = this.template.parentElement;
        const comment = document.createComment("list");
        parent.insertBefore(comment, this.template);
        parent.removeChild(this.template);

        const binder = new Binder(this.template);
        itemBinderCallback(binder);
        this.itemBindings = binder.bindings;
    }

    link(host, instance, context) {
        return new ListBinding(this, host, instance, context);
    }
}

class ComponentBindingMetadata {
    constructor(template, selector) {
        const element = getElementBySelector(template, selector);
        this.selector = selector;
        this.path = getElementPath(template, element);
        this.component = getComponentByName(element.localName);
    }

    link(host, instance) {
        const element = getElementByPath(host, this.path);
        mount(element, this.component);
    }
}
