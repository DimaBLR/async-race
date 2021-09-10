import { BaseComponent } from '../component';
import { CAR_IMG } from '../image-car';

export class WinnerItem extends BaseComponent {
  number: BaseComponent;

  car: BaseComponent;

  name: BaseComponent;

  wins: BaseComponent;

  time: BaseComponent;

  constructor(number: string, car: string, name: string, wins: string, time: string, parent?: HTMLElement, head?: boolean) {
    super('div', ['table-line']);

    this.number = new BaseComponent('div', ['table-number'], `${number}`, null, null, this.element);
    this.car = new BaseComponent('div', ['table-car'], CAR_IMG, null, null, this.element);
    this.car.element.style.fill = `${car}`;
    this.name = new BaseComponent('div', ['table-name'], `${name}`, null, null, this.element);
    this.wins = new BaseComponent('div', ['table-wins'], `${wins}`, null, null, this.element);
    this.time = new BaseComponent('div', ['table-time'], `${time}`, null, null, this.element);

    if (head) {
      this.car.element.innerHTML = 'Car';
      this.element.classList.add('head-line');
      this.time.element.classList.add('time-header');
      this.wins.element.classList.add('wins-header');
    }

    if (parent) parent.appendChild(this.element);
  }

  destroy(): void {
    super.destroy();
  }
}
