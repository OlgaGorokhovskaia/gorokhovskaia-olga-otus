const getPseudoClass = (index, maxIndex) => {
    let pseudoClass;

    if (index === 0) {
        pseudoClass = `:first-of-type`;
    } else if (index === maxIndex) {
        pseudoClass = `:last-of-type`;
    } else {
        pseudoClass = `:nth-of-type(${index})`;
    }

    return pseudoClass;
};

const hasId = (selector) => selector?.indexOf('#') !== -1;

const getSelector = (element) => {
    if (!element) return null;

    const { id, tagName, className } = element;
    const tag = tagName.toLowerCase();
    const classNames = className && className.replace(' ', '.');
    let elementName = tag;

    if (id) {
        return `${tag}#${id}`;
    }

    if (classNames) {
        elementName = `${tag}.${classNames}`;
    }

    const selector = getAdditionalSelector(element);

    return `${elementName}${selector}`;
}; 

const getAdditionalSelector = (element) => {
    if (!element || !element.parentElement || !element.parentElement.children) {
        return '';
    }

    const { children } = element.parentElement;
    let index;
    let amoutOfSimmilarElements = 0;
    
    for (let i = 0; i < children.length; ++i) {
        const currentElement = children[i];
        const { tagName, className } = currentElement;
        
        if (tagName === element.tagName && className === element.className) {
            amoutOfSimmilarElements = amoutOfSimmilarElements + 1;
        }

        if (currentElement === element) {
            index = amoutOfSimmilarElements - 1;
        };
    };

    if (amoutOfSimmilarElements > 1) {
        return getPseudoClass(index, amoutOfSimmilarElements);
    }

    return '';
};

const getPathByElement = (element, nextPath = '') => {
    if (!element) return null;

    const elementSelector = getSelector(element);
    const newPath = nextPath ? `${elementSelector} > ${nextPath}` : elementSelector;
    const { parentElement } = element;

    if (!hasId(elementSelector) && parentElement) {
        return getPathByElement(parentElement, newPath);
    }
    
    return newPath;
};

const getPath = (element) => {
    if (!element) return null;

    return getPathByElement(element);
};

//exports

exports.getPath = getPath;
exports.getPathByElement = getPathByElement;
exports.getSelector = getSelector;
exports.hasId = hasId;
exports.getPseudoClass = getPseudoClass;