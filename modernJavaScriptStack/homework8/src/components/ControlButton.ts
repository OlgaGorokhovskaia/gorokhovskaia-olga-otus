interface IControlButton {
    classNames: string;
    icon: string;
    onClick?: (e?: Event) => void;
    parent?: HTMLElement;
};

export class ControlButton implements IControlButton {
    classNames: string;
    icon: string;
    onClick?: (e?: Event) => void;
    parent?: HTMLElement;

    constructor(classNames: string, icon: string, onClick?: (e?: Event) => void, parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.classNames = classNames || "";
        this.icon = icon || "";
        this.onClick = onClick || null;

        this.init();
    };

    init(): void {
        const icon = document.createElement('i');
        icon.className = this.classNames;
        icon.setAttribute('style', `background-image: url(${this.icon});`);

        if (this.onClick) {
            icon.addEventListener('click', this.onClick);
        }

        this.parent.appendChild(icon);
    };
};