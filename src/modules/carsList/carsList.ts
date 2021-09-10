import './carlist.scss';
import { control, main, model } from '../..';
import { Car } from '../car/car';
import { BaseComponent } from '../component';
import { PageNavigate } from '../pageNavigate/pageNavigate';
import { IResult } from '../interfaces';

export class CarList extends BaseComponent {
  raceResult: Array<IResult> = [];

  raceWinner = { id: 0, time: 0 };

  cars: Array<Car> = [];

  resetCars: Array<boolean> = [];

  nav: PageNavigate;

  carsWrap: BaseComponent;

  singleRace = false;

  constructor() {
    super('div', ['car-list']);
    this.nav = new PageNavigate(this.element, 7);
    this.carsWrap = new BaseComponent('div', ['cars-wrapper'], null, null, null, this.element);

    this.nav.prevBtn.element.onclick = () => {
      this.nav.getPrev(); this.updatePage();
    };
    this.nav.nextBtn.element.onclick = () => {
      this.nav.getNext(); this.updatePage();
    };
  }

  async updatePage(): Promise<void> {
    this.nav.setData('garage');
    this.cars.forEach((el) => el.destroy());
    this.clear();
    const hostCars = await model.getData(`garage?_page=${this.nav.currentPage}&_limit=7`);

    hostCars.forEach((el: Car) => {
      this.cars.push(new Car(el, this.carsWrap.element));
    });

    main.element.appendChild(this.element);
  }

  clear(): void {
    this.cars.forEach((el) => el.destroy());
    this.cars = [];
  }
}
