const getSelectorWithPseudoClass = (selector, index, maxIndex) => {
    let pseudoClass;

    if (index === 0) {
        pseudoClass = `:first-of-type`;
    } else if (index === maxIndex) {
        pseudoClass = `:last-of-type`;
    } else {
        pseudoClass = `:nth-of-type(${index})`;
    }

    return `${selector}${pseudoClass}`;
};

const getNextPath = (arr, index) => arr.slice(index, arr.length).join(' > ');

const isCorrectSelector = (elem, nextPath) => {
    const selector = nextPath ? `${elem} > ${nextPath}` : elem;
    return !!document.querySelector(selector);
}

const preparePath = (elements, pathToElement, indexOfElement) => {
    let preparedPath = pathToElement;
    const numberOfElements = elements.length;

    for (i = 0; i < numberOfElements; i++) {
        const lastIndex = numberOfElements - 1;
        const selector = getSelectorWithPseudoClass(pathToElement, i, lastIndex);
        const nextPath = getNextPath(elements, indexOfElement + 1);
        
        if (isCorrectSelector(selector, nextPath)) {
            preparedPath = selector;

            break;
        };
    };

    return preparedPath;
};

const hasId = (selector) => selector.indexOf('#') !== -1;

const fixSelectors = (path) => {
    if (!path) return null;

    const elements = path.split(' > ');

    return elements.reduce((acc, currentElement, index) => {
        if (hasId(currentElement)) {
            return currentElement;
        }

        const pathToCurrentElem = acc ? `${acc} > ${currentElement}` : currentElement;
        const similarElements = document.querySelectorAll(pathToCurrentElem);
        const hasSeveralSimilarElements = similarElements && similarElements.length > 1;
        const indexOfNextElement = index + 1;

        return hasSeveralSimilarElements ? preparePath(elements, pathToCurrentElem, indexOfNextElement) : pathToCurrentElem;
    }, '');
};

const getElementName = (element) => {
    if (!element) return null;

    const { id, tagName, className } = element;
    const tag = tagName.toLowerCase();
    const classNames = className && className.replace(' ', '.');

    if (id) {
        return `${tag}#${id}`;
    }

    if (classNames) {
        return `${tag}.${classNames}`;
    }

    return tag;
};

const getPathByElement = (element, nextPath = '') => {
    if (!element || !element.tagName) return null;

    const elementName = getElementName(element);
    const newPath = nextPath ? `${elementName} > ${nextPath}` : elementName;
    const parent = element.parentElement;

    if (parent) {
        return getPathByElement(parent, newPath);
    }
    
    return newPath;
};

const getPath = (selector) => {
    if (!selector) return null;

    const element = document.querySelector(selector);
    const path = getPathByElement(element);

    return fixSelectors(path);
};

//exports

exports.getPath = getPath;
exports.getElementName = getElementName;
exports.getPathByElement = getPathByElement;
exports.getSelectorWithPseudoClass = getSelectorWithPseudoClass;
exports.getNextPath = getNextPath;
exports.isCorrectSelector = isCorrectSelector;
exports.hasId = hasId;
exports.fixSelectors = fixSelectors;
exports.preparePath = preparePath;