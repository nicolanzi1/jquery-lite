const DOMNodeCollection = require('./dom_node_collection');

const _docReadyCallBacks = [];
let _docReady = false;

window.$l = (arg) => {
    switch (typeof arg) {
        case "function":
            return registerDocReadyCallback(arg);
        case "string":
            return getNodesFromDom(arg);
        case "object":
            if (arg instanceof HTMLElement) {
                return new DOMNodeCollection([arg]);
            }
    }
};

registerDocReadyCallback = (func) => {
    if (!_docReady) {
        _docReadyCallBacks.push(func);
    } else {
        func();
    }
};

getNodesFromDom = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const nodesArray = Array.from(nodes);
    return new DOMNodeCollection(nodesArray);
};

document.addEventListener('DOMContentLoaded', () => {
    _docReady = true;
    _docReadyCallBacks.forEach(func => func());
});