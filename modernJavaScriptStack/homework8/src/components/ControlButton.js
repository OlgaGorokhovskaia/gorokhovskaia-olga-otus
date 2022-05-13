export class ControlButton {
    constructor(parent, classNames, icon, onClick) {
        this.parent = parent || document.body;
        this.classNames = classNames || "";
        this.icon = icon || "";
        this.onClick = onClick || null;

        this.init();
    };

    init() {
        const icon = document.createElement('i');
        icon.className = this.classNames;
        icon.setAttribute('style', `background-image: url(${this.icon});`);

        if (this.onClick) {
            icon.addEventListener('click', this.onClick);
        }

        this.parent.appendChild(icon);
    };
};