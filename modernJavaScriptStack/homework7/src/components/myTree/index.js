import * as myLeaf from '../myLeaf';

class MyTree extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.data = JSON.parse(this.attributes.data.value);
    }

    connectedCallback() {
        this.createList([this.data], this);
    }

    createList = (items, parent) => {
        const ul = document.createElement('ul');
        ul.innerHTML = `<style>
            ul {
                padding: 0 0 0;
                list-style: none;
                margin: 0 0 0 60px;
            }
        </style>`;

        items.forEach((item) => {
            const li = document.createElement('li');
            const hasItems = item.items && item.items.length > 0;

            const myLeaf = document.createElement('my-leaf');
            myLeaf.setAttribute("id", item.id);
            myLeaf.setAttribute("icon", hasItems ? "isClosed" : null);

            li.appendChild(myLeaf);

            if (hasItems) {
                myLeaf.onclick = this.toggleListItem.bind(this, item.items);
            }

            ul.appendChild(li);
        });

        parent.shadowRoot.appendChild(ul);
    };

    toggleListItem = (items, e) => {
        e.stopPropagation();
        const icon = e.target.getAttribute('icon');

        if (icon === "isOpen") {
            e.target.setAttribute('icon', "isClosed");
            e.target.shadowRoot.innerHTML = e.target.outerHTML;

        } else if (icon === "isClosed") {
            this.createList(items, e.target);
            e.target.setAttribute('icon', "isOpen");
        }
    }
}


window.customElements.define('my-tree', MyTree);