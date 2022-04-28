import * as myLeaf from '../myLeaf';

class MyTree extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const data = JSON.parse(this.attributes.data.value);

        this.id = data.id;
        this.items = data.items || [];
    }

    connectedCallback() {
        const div = document.createElement('div');
        div.innerHTML = `<my-leaf id=${this.id} items=${JSON.stringify(this.items)}></my-leaf>`;

        this.shadowRoot.appendChild(div);
    }
}



window.customElements.define('my-tree', MyTree);