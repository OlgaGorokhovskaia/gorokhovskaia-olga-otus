const { 
    getElementName,
    getPathByElement,
    getPath,
    getSelectorWithPseudoClass,
    isCorrectSelector,
    getNextPath,
    hasId,
    fixSelectors,
    preparePath,
} = require('./task');
const { JSDOM } = require("jsdom");

const dom = new JSDOM(`
    <!DOCTYPE html>
    <body>
        <ul class="main">
            <li>First row</li>
            <li>Second row</li>
        </ul>
    </body>
`);

global.document = dom.window.document;

describe('homework_3', () => {
    describe('getPath', () => {
        it('should return correct path for first div', () => {
            const result = getPath('li');
            expect(result).toBe('html > body > ul.main > li:first-of-type');
        });
    
        it('should return null if argument is empty string', () => {
            const result = getPath('');
            expect(result).toBeNull();
        });
    
        it('should to be null if argument is null', () => {
            const result = getPath(null);
            expect(result).toBeNull();
        });
    });
    describe('getElementName', () => {
        it('should return tag if element has only tag', () => {
            const fakeElement = { tagName: 'div' };
            const result = getElementName(fakeElement);
            expect(result).toBe('div');
        });

        it('should return tag with classnames if element has class', () => {
            const fakeElement = { tagName: 'div', className: 'block red' };
            const result = getElementName(fakeElement);
            expect(result).toBe('div.block.red');
        });

        it('should return tag with id if element has id', () => {
            const fakeElement = { id: 'main', tagName: 'div', className: 'block red' };
            const result = getElementName(fakeElement);
            expect(result).toBe('div#main');
        });

        it('should return null if argument is empty string', () => {
            const result = getElementName('');
            expect(result).toBeNull();
        });
    
        it('should to be null if argument is null', () => {
            const result = getElementName(null);
            expect(result).toBeNull();
        });
    });
    describe('getPathByElement', () => {
        it('should have correctly path with next path', () => {
            const fakeElement = { tagName: 'html' };
            const result = getPathByElement(fakeElement, 'body');
            expect(result).toBe('html > body');
        });

        it('should have correctly path without next path', () => {
            const fakeElement = { tagName: 'body', parentElement: { tagName: 'html' } };
            const result = getPathByElement(fakeElement);
            expect(result).toBe('html > body');
        });

        it('should return null if argument is empty string', () => {
            const result = getPathByElement('');
            expect(result).toBeNull();
        });
    
        it('should to be null if argument is null', () => {
            const result = getPathByElement(null);
            expect(result).toBeNull();
        });
    });
    describe('getNextPath', () => {
        const fakeElements = ['div', 'ul', 'li'];

        it('should be correct path if it has index of first element', () => {
            const result = getNextPath(fakeElements, 0);
            expect(result).toBe('div > ul > li');
        });
        it('should be empty string if it has index of last element', () => {
            const result = getNextPath(fakeElements, 2);
            expect(result).toBe('li');
        });
        it('should be empty string if it has empty array', () => {
            const result = getNextPath([], 0);
            expect(result).toBe('');
        });
    });
    describe('isCorrectSelector', () => {
        it('should be truthy if it has a correct element and correct the next path', () => {
            const result = isCorrectSelector('ul', 'li');
            expect(result).toBeTruthy();
        });
        it('should be truthy if it has a correct element and does not have the next path', () => {
            const result = isCorrectSelector('li', null);
            expect(result).toBeTruthy();
        });
        it('should be false if it has an incorrect element', () => {
            const result = isCorrectSelector(null, 'li');
            expect(result).toBeFalsy();
        });
    });
    describe('getSelectorWithPseudoClass', () => {
        it('should return pseudo-class for first element', () => {
            const result = getSelectorWithPseudoClass('div', 0, 9);
            expect(result).toBe('div:first-of-type');
        });
        it('should return pseudo-class for last element', () => {
            const result = getSelectorWithPseudoClass('div', 9, 9);
            expect(result).toBe('div:last-of-type');
        });
        it('should return pseudo-class for third element', () => {
            const result = getSelectorWithPseudoClass('div', 2, 9);
            expect(result).toBe('div:nth-of-type(2)');
        });
    });
    describe('hasId', () => {
        it('should be true if it has a sharp', () => {
            const result = hasId('div#main');
            expect(result).toBeTruthy();
        });
        it('should be false if it does not have a sharp', () => {
            const result = hasId('div');
            expect(result).toBeFalsy();
        });
        it('should be false if it has null', () => {
            const result = hasId('div');
            expect(result).toBeFalsy();
        });
    });
    describe('fixSelectors', () => {
        it('should return null if argument is empty string', () => {
            const result = fixSelectors('');
            expect(result).toBeNull();
        });
        it('should return null if argument is null', () => {
            const result = fixSelectors(null);
            expect(result).toBeNull();
        });
        it('should return selector with id', () => {
            const result = fixSelectors('html > body > div#main');
            expect(result).toBe('div#main');
        });
        it('', () => {
            const result = fixSelectors('html > body > ul > li');
            expect(result).toBe('html > body > ul > li:first-of-type');
        });
    });
    describe('preparePath', () => {
        const fakeElements = ['html', 'body', 'ul', 'li'];

        it('should return ', () => {
            const result = preparePath(fakeElements, 'html > body > ul > li', 3);
            expect(result).toBe('html > body > ul > li:first-of-type');
        });
        it('should return path from argument', () => {
            const result = preparePath(['div'], 'div', 0);
            expect(result).toBe('div');
        });
        it('should return null if argument is empty array', () => {
            const result = preparePath([], null, null);
            expect(result).toBeNull();
        });
    });
});