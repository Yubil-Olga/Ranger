import IUserSettings from '../app/IUserSettings';
import ControlPanel from './ComtrolPanel/ControlPanel';
import '../app/app';
import $ from 'jquery';

export default class SliderInit {
  private settings: IUserSettings
  private container = document.createElement('div');
  private sliderWrapper = document.createElement('div');
  private controlPanel: HTMLElement

  constructor(settings: IUserSettings) {
    this.settings = settings;
    this.init();
  }

  init(){
    this.container.classList.add('demo__sample');
    this.sliderWrapper.classList.add('demo__slider-wrapper');
    this.container.append(this.sliderWrapper);
    document.body.querySelector('.demo').append(this.container);
    const facade = $(this.sliderWrapper).perfectSlider(this.settings);
    this.controlPanel = new ControlPanel(this.settings, facade).getElement();
    this.container.prepend(this.controlPanel);
  }
}