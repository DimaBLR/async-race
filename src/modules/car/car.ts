import './car.scss';
import { BaseComponent } from '../component';
import { CAR_IMG } from '../image-car';
import {
  carList, control, main, modal, model, winners,
} from '../..';
import { ICar, IRaceData, IWinner } from '../interfaces';

export class Car extends BaseComponent {
  name: string;

  color: string;

  readonly id: number;

  select: BaseComponent;

  remove: BaseComponent;

  start: BaseComponent;

  reset: BaseComponent;

  carName: BaseComponent;

  carImg: BaseComponent;

  control: BaseComponent;

  race: BaseComponent;

  flagImg: BaseComponent;

  constructor({ name, color, id }: ICar, parent?: HTMLElement) {
    super('div', ['car-block']);
    this.name = name;
    this.color = color;
    this.id = id;

    // control component
    this.control = new BaseComponent('div', ['car-block__control'], null, null, null, this.element);
    this.select = new BaseComponent('div', ['btn-select'], 'select', null, null, this.control.element);
    this.select.element.onclick = () => { this.selectCar(); };
    this.remove = new BaseComponent('div', ['btn-remove'], 'remove', null, null, this.control.element);
    this.remove.element.onclick = () => { this.removeCar(); };
    this.start = new BaseComponent('div', ['btn-start'], 'A', null, null, this.control.element);
    this.start.element.onclick = () => {
      carList.raceWinner = { id: 0, time: 0 };
      carList.singleRace = true;
      this.drive();
    };
    this.reset = new BaseComponent('div', ['btn-reset', 'disable'], 'B', null, null, this.control.element);
    this.reset.element.onclick = () => { this.resetRace(); };
    this.carName = new BaseComponent('div', ['car-title'], `${this.name}`, null, null, this.control.element);

    // race component
    this.race = new BaseComponent('div', ['car-block__race'], null, null, null, this.element);
    this.carImg = new BaseComponent('div', ['car-img'], `${CAR_IMG}`, null, null, this.race.element);
    this.carImg.element.style.fill = `${this.color}`;
    this.flagImg = new BaseComponent('img', ['flag-img'], '', 'src', 'flag.png', this.race.element);

    if (parent) parent.appendChild(this.element);
  }

  async drive(): Promise<void> {
    this.reset.element.classList.remove('disable');
    this.start.element.classList.add('disable');
    const raceData: IRaceData = await model.getEngine(this.id, 'started');
    const raceTime = (raceData.distance / raceData.velocity) / 1000;
    this.carImg.element.style.animationDuration = `${raceTime}s`;
    this.carImg.element.classList.add('get-drive');
    const finishStat = await model.race(this.id);
    this.checkWin(finishStat, raceTime);
  }

  checkWin(finishStat: { success: boolean }, raceTime:number): void {
    if (finishStat.success == false) this.carImg.element.style.animationPlayState = 'paused';
    if (finishStat.success === true && carList.raceWinner.id === 0) {
      carList.raceWinner = { id: this.id, time: raceTime };
      winners.addWin(this.id, +raceTime.toFixed(2));
      modal.get(this.name, raceTime);
      if (carList.singleRace) modal.getSingleWin();
    }
    carList.raceResult.push({
      id: this.id, time: raceTime, name: this.name, succes: finishStat.success,
    });

    if (carList.raceResult.length == carList.cars.length && !carList.singleRace) {
      (main.raceVideo.element as HTMLVideoElement).currentTime = 0;
      (main.raceVideo.element as HTMLVideoElement).pause();
      modal.showResultsRace(carList.raceResult);
    }
  }

  async resetRace(): Promise<void> {
    this.carImg.element.classList.add('drive-back');
    this.carImg.element.style.animationDuration = '1s';
    await model.getEngine(this.id, 'stopped');
    this.carImg.element.classList.remove('drive-back');
    carList.resetCars.push(true);
    if (carList.resetCars.length == carList.cars.length) {
      control.reset.element.classList.add('disable');
      control.race.element.classList.remove('disable');
    }
    this.reset.element.classList.add('disable');
    this.start.element.classList.remove('disable');
    this.carImg.element.classList.remove('get-drive');
    this.carImg.element.style.animationPlayState = 'running';
  }

  async removeCar(): Promise<void> {
    this.remove.element.classList.add('disable');
    if (control.currentCar.id == this.id) {
      (control.inputTextUpdate.element as HTMLInputElement).value = '';
      (control.inputColorUpdate.element as HTMLInputElement).value = '#fff000';
    }
    const arrWinners = await model.getData('winners');
    arrWinners.forEach(async (el:IWinner) => {
      if (el.id == this.id) await model.deleteCar(this.id, 'winners');
    });
    await model.deleteCar(this.id, 'garage');
    this.destroy(); carList.updatePage();
  }

  selectCar(): void {
    control.currentCar = { id: this.id, name: this.name, color: this.color };
    (control.inputTextUpdate.element as HTMLInputElement).value = this.name;
    (control.inputColorUpdate.element as HTMLInputElement).value = this.color;
  }

  destroy(): void {
    super.destroy();
  }
}
