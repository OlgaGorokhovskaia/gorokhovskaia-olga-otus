import * as myTree from './src/components/myTree';
import * as data from './src/data/simpleData.json';

function component(data) {
    const ul = document.createElement('ul');
    ul.innerHTML = `<my-tree data=${JSON.stringify(data)}></my-tree>`;

    document.body.appendChild(ul);
}

component(data);