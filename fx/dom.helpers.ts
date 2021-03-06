export function getElementBySelector(parent, selector) {
    const element = parent.querySelector(selector);
    if(!element) {
        throw new Error("Selector " + selector + " was not found");
    }

    return element;
}

export function getElementByPath(root, path) {
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

export function getElementPath(root, element): number[] {
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

export function getElementIndex(parent, element) {
    const nodes = parent.childNodes;
    for(let i=0; i<nodes.length; i++) {
        const child = nodes[i];
        if(child == element) {
            return i;
        }
    }

    return -1;
}

export function insertBefore(ref, template) {
    const cont = document.createElement("cont");
    cont.innerHTML = template;
    const element = cont.childNodes[0];
    ref.parentElement.insertBefore(element, ref);
    return element;
}
