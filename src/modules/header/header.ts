import './header.scss';
import { BaseComponent } from '../component';

export class HeaderApp extends BaseComponent {
  arrLinks: Array<HTMLElement> = [];

  constructor() {
    super('header', ['header'], null, null, null, document.body);
    const garage = new BaseComponent('a', ['link'], '⛐ Garage', 'href', '#garage');
    const winners = new BaseComponent('a', ['link'], '🏆 Winners', 'href', '#winners');
    [garage.element, winners.element].forEach((el) => {
      this.arrLinks.push(el);
      this.element.appendChild(el);
    });
  }
}
