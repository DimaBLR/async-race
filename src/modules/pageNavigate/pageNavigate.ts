import './pageNavigate.scss';
import { model } from '../..';
import { BaseComponent } from '../component';

export class PageNavigate extends BaseComponent {
  currentPage = 1;

  maxPage = 1;

  pageNum: BaseComponent;

  prevBtn: BaseComponent;

  nextBtn: BaseComponent;

  garageNum: BaseComponent;

  limit: number;

  constructor(parent:HTMLElement, limit: number) {
    super('div', ['list-control']);
    this.limit = limit;
    parent.appendChild(this.element);
    this.pageNum = new BaseComponent('div', ['page-number'], 'Page', null, null, this.element);
    this.prevBtn = new BaseComponent('div', ['prev-btn', 'btn-disable'], 'PREV', null, null, this.element);
    this.nextBtn = new BaseComponent('div', ['next-btn'], 'NEXT', null, null, this.element);
    this.garageNum = new BaseComponent('div', ['cars-number'], 'Garage()', null, null, this.element);
  }

  getPrev(): void {
    this.currentPage += -1;
    if (this.currentPage - 1 == 0) this.prevBtn.element.classList.add('btn-disable');
    if (this.maxPage > 1) this.nextBtn.element.classList.remove('btn-disable');
  }

  getNext(): void {
    this.currentPage += 1;
    this.prevBtn.element.classList.remove('btn-disable');
  }

  async setData(location:string): Promise<void> {
    const sumCars = await model.getData(`${location}?_page=1`, true);
    this.garageNum.element.innerHTML = `${location} (${sumCars})`;
    this.maxPage = Math.ceil(sumCars / this.limit);
    this.pageNum.element.innerHTML = `Page #${this.currentPage}`;
    (this.currentPage < this.maxPage) ? this.nextBtn.element.classList.remove('btn-disable')
      : this.nextBtn.element.classList.add('btn-disable');
  }
}
