import './modal.scss';
import { BaseComponent } from '../component';
import { IResult } from '../interfaces';

export class Modal extends BaseComponent {
  content: BaseComponent;

  winner: BaseComponent;

  otherResult: BaseComponent;

  btnClose: BaseComponent;

  constructor() {
    super('div', ['modal-window']);
    this.content = new BaseComponent('div', ['modal-content'], '<h1>Results of the current race</h1>', null, null, this.element);
    this.winner = new BaseComponent('div', ['winner-race'], 'There is no winner because all cars have broken engines', null, null, this.content.element);
    this.otherResult = new BaseComponent('div', ['result-race'], '<h2>Waiting for the end of the race......</h2>', null, null, this.content.element);
    document.body.appendChild(this.element);

    this.btnClose = new BaseComponent('div', ['btn-close'], 'CLOSE');
    this.btnClose.element.onclick = () => {
      this.winner.element.innerHTML = 'There is no winner because all cars have broken engines';
      this.otherResult.element.innerHTML = '<h2>Waiting for the end of the race......</h2>';
      this.element.style.display = 'none';
    };
  }

  get(name: string, time: number):void {
    this.winner.element.innerHTML = `Winner of this race ${name}, time ${time.toFixed(2)} sec`;
    this.element.style.display = 'block';
  }

  showResultsRace(arr: Array<IResult>):void {
    this.element.style.display = 'block';
    this.otherResult.element.innerHTML = '';
    const broken = arr.filter((el: { succes: boolean; }) => el.succes == false);

    for (const item of arr) {
      const engine = (item.succes == false) ? 'engine broken' : `${item.time.toFixed(2)} sec`;
      const car = new BaseComponent('div', ['race-result'], `${item.name}, ${engine}`);
      this.otherResult.element.appendChild(car.element);
    }
    this.getCloseBtn(this.otherResult.element);
  }

  getCloseBtn(parent: HTMLElement): void {
    parent.appendChild(this.btnClose.element);
  }

  getSingleWin(): void {
    this.otherResult.element.innerHTML = '';
    this.getCloseBtn(this.otherResult.element);
  }
}
