import './footer.scss';
import { BaseComponent } from '../component';

export class FooterApp extends BaseComponent {
  constructor() {
    super('footer', ['footer'], null, null, null, document.body);

    this.element.innerHTML = 'RS School 2021. Dmitry Belov';
  }
}
