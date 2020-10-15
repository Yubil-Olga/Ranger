import ControlPanel from './ComtrolPanel/ControlPanel';
import '../app/app';
import $ from 'jquery';
import IOptions from '../app/IOptions';

export default class SliderInit {
  private options: IOptions
  private container = document.createElement('div');
  private sliderWrapper = document.createElement('div');
  private controlPanel: HTMLElement

  constructor(options: IOptions) {
    this.options = options;
    this.init();
  }

  init(){
    this.container.classList.add('demo__sample');
    this.sliderWrapper.classList.add('demo__slider-wrapper');
    this.container.append(this.sliderWrapper);
    document.body.querySelector('.demo').append(this.container);
    const facade = $(this.sliderWrapper).perfectSlider(this.options);
    this.controlPanel = new ControlPanel(facade).getElement();
    this.container.prepend(this.controlPanel);
  }
}
