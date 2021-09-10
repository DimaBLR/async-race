import './winners.scss';
import { BaseComponent } from '../component';
import { model } from '../..';
import { PageNavigate } from '../pageNavigate/pageNavigate';
import { WinnerItem } from './winnerItem';

export class Winners extends BaseComponent {
  arrWinners: Array<WinnerItem> = [];

  nav: PageNavigate;

  timeOrder = true;

  winsOrder = true;

  currentSort: Array<string> = ['id', 'ASC'];

  constructor() {
    super('div', ['winners-table'], '<h1>Winners field</h1>');
    this.nav = new PageNavigate(this.element, 10);
    this.nav.prevBtn.element.onclick = () => {
      this.nav.getPrev();
      this.updatePage();
    };
    this.nav.nextBtn.element.onclick = () => {
      this.nav.getNext();
      this.updatePage();
    };

    const tableHead = new WinnerItem('Number', 'Car', 'Name', '△ Wins', '▽ Best time', this.element, true);
    tableHead.wins.element.onclick = () => {
      (this.winsOrder) ? this.currentSort = ['wins', 'DESC'] : this.currentSort = ['wins', 'ASC`'];
      this.updatePage();
      this.winsOrder = !this.winsOrder;
    };

    tableHead.time.element.onclick = () => {
      (this.timeOrder) ? this.currentSort = ['time', 'DESC'] : this.currentSort = ['time', 'ASC`'];
      this.updatePage();
      this.timeOrder = !this.timeOrder;
    };
  }

  async updatePage(): Promise<void> {
    this.nav.setData('winners');
    this.clear();
    const hostCars = await model.getData(`winners?_page=${this.nav.currentPage}&_limit=10&_sort=${this.currentSort[0]}&_order=${this.currentSort[1]}`);

    for (const i in hostCars) {
      const number = (+i === 9) ? `${`${this.nav.currentPage}0`}` : `${this.nav.currentPage - 1}${+i + 1}`;
      const car = await model.getData(`garage/${hostCars[i].id}`);
      const carItem = new WinnerItem(number, car.color, car.name, hostCars[i].wins, `${hostCars[i].time} sec`, this.element, false);
      this.arrWinners.push(carItem);
    }
  }

  async addWin(id: number, time: number): Promise<void> {
    const winners = await model.getData('winners');
    const winner = winners.find((el: { id: number; }) => el.id == id);

    if (winner) {
      const updatedCar = { wins: winner.wins += 1, time: Math.min(winner.time, time) };
      await model.updateCar(id, updatedCar, 'winners');
    } else {
      const newWinner = { id, wins: 1, time };
      await model.createCar(newWinner, 'winners');
    }
  }

  clear(): void {
    this.arrWinners.forEach((el) => el.destroy());
    this.arrWinners = [];
  }
}
