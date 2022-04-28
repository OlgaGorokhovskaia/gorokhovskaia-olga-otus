import plusImage from './img/plus.png';
import minusImage from './img/minus.png';

class MyLeaf extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.listItems = JSON.parse(this.items);
        this.toggleListItem = this.toggleListItem.bind(this);
    }

    connectedCallback() {
        const div = document.createElement('div');

        if (this.listItems.length > 0) {
            div.setAttribute('isOpen', false);
            div.addEventListener('click', this.toggleListItem, false);
        }

        div.innerHTML = `<style>
            div {
                display: inline-block;
                border-bottom: 2px solid;
                border-left: 2px solid;
                padding: 0 10px 0 32px;
                position: relative;
                line-height: 3;
            }
            
            div[isOpen]:hover {
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
            
            div[isOpen$="true"]::before {
                background-image: url(${minusImage});
                background-size: contain;
            }
            
            div[isOpen$="false"]::before {
                background-image: url(${plusImage});
                background-size: contain;
            }

            div > img {
                position: absolute;
                height: 18px;
                width: 18px;
                left: 20;
            }
        </style>
        Element ${this.id}`;
        this.shadowRoot.appendChild(div);
    }

    get items() {
        const items = [];
        const attributes = [...this.attributes];

        attributes.forEach((attr) => {
            if (attr.name.includes('items')) {
                items.push(attr.value);
            }
        });

        return items;
    }

    toggleListItem = (e) => {
        const isOpen = e.target.getAttribute('isOpen');
        console.log(isOpen);
        if (isOpen === 'true') {
            e.target.nextSibling.remove();
            e.target.setAttribute('isOpen', 'false');
        } else if (isOpen === 'false') {
            const ul = document.createElement('ul');

            this.listItems.forEach(({ id, items }) => {
                const li = document.createElement('li');
                li.innerHTML = `<style>
                    ul {
                        padding: 0 0 0;
                        list-style: none;
                        margin: 0 0 0 60px;
                    }
                </style>
                <my-leaf id=${id} items=${JSON.stringify(items || [])}></my-leaf>`;
                ul.appendChild(li);
            });

            this.shadowRoot.appendChild(ul);
            e.target.setAttribute('isOpen', 'true');
        }
    }
}

window.customElements.define('my-leaf', MyLeaf);