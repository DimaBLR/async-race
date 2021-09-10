export class BaseComponent {
  element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], content?: string | null, attr?: string | null, attrVal?: string | null, parent?: HTMLElement) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    if (content) this.element.innerHTML = `${content}`;
    if (attr) this.element.setAttribute(attr, `${attrVal}`);
    if (parent) parent.appendChild(this.element);
  }

  destroy(): void {
    this.element.remove();
  }
}
