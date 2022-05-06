import plusImage from './img/plus.png';
import minusImage from './img/minus.png';

class MyLeaf extends HTMLElement {
    static observedAttributes = ["icon"];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.wrapper = document.createElement('div');
    }

    connectedCallback() {
        this.wrapper.setAttribute('icon', this.getIcon);

        this.wrapper.innerHTML = `<style>
            div {
                display: inline-block;
                border-bottom: 2px solid;
                border-left: 2px solid;
                padding: 0 10px 0 32px;
                position: relative;
                line-height: 3;
            }
            
            div[icon]:hover {
                cursor: pointer;
                color: #8a2be2;
                border-color: #000;
            }
            
            div::before {
                content: '';
                height: 18px;
                width: 18px;
                position: absolute;
                left: 10px;
                top: calc(50% - 18px/2);
            }
            
            div[icon$="isOpen"]::before {
                background-image: url(${minusImage});
                background-size: contain;
            }
            
            div[icon$="isClosed"]::before {
                background-image: url(${plusImage});
                background-size: contain;
            }
        </style>
        Element ${this.id}
        `;
        this.shadowRoot.appendChild(this.wrapper);
    }

    get getIcon() {
        const attributes = [...this.attributes];
        const icon = attributes.find((attr) => attr.name.includes('icon'));

        return icon ? icon.value : null;
    }

    attributeChangedCallback(name, _, newValue) {
        if (name === 'icon') {
            this.wrapper.setAttribute(name, newValue);
        }
    }

}

window.customElements.define('my-leaf', MyLeaf);