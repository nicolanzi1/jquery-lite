class DOMNodeCollection {
    constructor (nodes) {
        this.nodes = nodes;
    }

    each(cb) {
        this.nodes.forEach(cb);
    }

    html(html) {
        if (typeof html === "string") {
            this.each((node) => {
                node.innerHTML = html
            });
        } else if (this.nodes.length > 0) {
            return this.nodes[0].innerHTML;
        }
    }

    empty() {
        this.html('');
    }

    append(children) {
        if (this.nodes.lenght === 0) return;

        if (typeof children === 'object' &&
        !(children instanceof DOMNodeCollection)) {
            children = $l(children);
        }

        if (typeof children === "string") {
            this.each((node) => {
                node.innerHTML += children;
            });
        } else if (children instanceof DOMNodeCollection) {
            this.each((node) => {
                children.each((childNode) => {
                    node.appendChild(childNode.cloneNode(true));
                });
            });
        }
    }

    remove() {
        this.each(node => node.parentNode.removeChild(node));
    }

    attr(key, val) {
        if (typeof val === "string") {
            this.each(node => node.setAttribute(key, val));
        } else {
            return this.nodes[0].getAttribute(key);
        }
    }

    addClass(newClass) {
        this.each(node => node.classList.add(newClass));
    }

    removeClass(oldClass) {
        this.each(node => node.classList.remove(oldClass));
    }

    toggleClass(toggleClass) {
        this.each(node => node.classList.toggle(toggleClass));
    }

    find() {
        let foundNodes = [];
        this.each((node) => {
            const nodeList = node.querySelectorAll(selector);
            foundNodes = foundNodes.concat(Array.from(nodeList));
        });
        return new DOMNodeCollection(foundNodes);
    }

    children() {
        let childNodes = [];
        this.each((node) => {
            const childNodeList = node.children;
            childNodes = childNodes.concat(Array.from(childNodeList));
        });
        return new DOMNodeCollection(childNodes);
    }

    parent() {
        let parentNodes = []

        this.each(({ parentNode }) => {
            if (!parentNode.visited) {
                parentNodes.push(parenNode);
                parentNode.visited = true;
            }
        });

        parentNodes.forEach((node) => {
            node.visited = false;
        });
        return new DOMNodeCollection(parentNodes);
    }
}

module.exports = DOMNodeCollection;