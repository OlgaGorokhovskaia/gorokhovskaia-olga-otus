const { 
    getSelector,
    getPathByElement,
    getPath,
    getPseudoClass,
    hasId,
} = require('./task');

const { JSDOM } = require("jsdom");
const dom = new JSDOM(`
    <!DOCTYPE html>
    <body>
        <ul class="main">
            <li>First row</li>
            <li>Second row</li>
            <li>Third row</li>
        </ul>
    </body>
`);

global.document = dom.window.document;

describe('homework_3', () => {
    describe('getPath', () => {
        it('should return correct path for first li', () => {
            const element = document.querySelector('html > body > ul > li');
            const result = getPath(element);
            expect(result).toBe('html > body > ul.main > li:first-of-type');
        });

        it('should return correct path for first li', () => {
            const element = document.querySelector('html > body > ul > li');
            const result = getPath(element);
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

    describe('getSelector', () => {
        it('should return tag if element has only tag', () => {
            const fakeElement = { tagName: 'div' };
            const result = getSelector(fakeElement);
            expect(result).toBe('div');
        });

        it('should return tag with classnames if element has class', () => {
            const fakeElement = { tagName: 'div', className: 'block red' };
            const result = getSelector(fakeElement);
            expect(result).toBe('div.block.red');
        });

        it('should return tag with id if element has id', () => {
            const fakeElement = { id: 'main', tagName: 'div', className: 'block red' };
            const result = getSelector(fakeElement);
            expect(result).toBe('div#main');
        });

        it('should return null if argument is empty string', () => {
            const result = getSelector('');
            expect(result).toBeNull();
        });
    
        it('should to be null if argument is null', () => {
            const result = getSelector(null);
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

    describe('getPseudoClass', () => {
        it('should return pseudo-class for first element', () => {
            const result = getPseudoClass(0, 9);
            expect(result).toBe(':first-of-type');
        });

        it('should return pseudo-class for last element', () => {
            const result = getPseudoClass(9, 9);
            expect(result).toBe(':last-of-type');
        });

        it('should return pseudo-class for third element', () => {
            const result = getPseudoClass(2, 9);
            expect(result).toBe(':nth-of-type(2)');
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
});