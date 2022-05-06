import * as myTree from './src/components/myTree';
import * as data from './src/data/simpleData.json';

function component(data) {
    const div = document.createElement('div');
    div.innerHTML = `<my-tree data=${JSON.stringify(data)}></my-tree>`;

    document.body.appendChild(div);
}

component(data);