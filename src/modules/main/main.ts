import './main.scss';
import { BaseComponent } from '../component';
import { FooterApp } from '../footer/footer';

export class MainApp extends BaseComponent {
  raceVideo: BaseComponent;

  vidos: any;

  constructor() {
    super('main', ['content'], null, null, null, document.body);
    const footer = new FooterApp();
    this.raceVideo = new BaseComponent('video', ['bgvideo'], null, 'src', 'race.mp4', document.body);
  }
}
