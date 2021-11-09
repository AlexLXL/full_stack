export const nodeOps = {
    createElement(tagName) {
        return document.createElement(tagName)
    },
    remove(child) {
        const parent = child.parentNode
        if (parent) {
            parent.removeChild(child)
        }
    },
    querySelector(selector) {
        return document.querySelector(selector)
    },
    insert(child, parent, anchor = null) {
        parent.insertBefore(child, anchor)
    },
    createText(text) {
        return document.createTextNode(text)
    },
    setElementText(el, text) {
        el.textContent = text; // innerHTML会有风险
    },
    setText(node, text) {
        node.nodeValue = text
    }
}