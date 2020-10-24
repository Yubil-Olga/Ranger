import bind from 'bind-decorator';
import Slider from './Slider/Slider';
import EventDispatcher from '../EventDispatcher/EventDispatcher';
import IOptions from '../IOptions';

export default class View {
  private options: IOptions
  private activeThumbNum: number
  public slider: Slider
  public inputChanged = new EventDispatcher(this)
  private parent: HTMLElement

  constructor(options: IOptions, elem: HTMLElement) {
    this.options = options;
    this.initSlider(elem);
    this.bindEventListeners();
  }

  initSlider(elem: HTMLElement) {
    this.parent = elem;
    this.slider = new Slider(this.options);
    elem.append(this.slider.container);
  }

  updateOptions(options: IOptions) {
    this.options = options;
    this.removeEventListeners();
    this.slider.container.remove();
    this.slider = new Slider(options);
    this.parent.append(this.slider.container);
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.slider.track.addEventListener('click', this.handleSliderClick);
    this.slider.label.addEventListener('click', this.handleSliderClick);
    this.slider.track.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.track.addEventListener('dragstart', this.stopDrag);
  }

  removeEventListeners() {
    this.slider.track.removeEventListener('click', this.handleSliderClick);
    this.slider.label.removeEventListener('click', this.handleSliderClick);
    this.slider.track.removeEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.track.removeEventListener('dragstart', this.stopDrag);
  }

  stopDrag(event: MouseEvent): void {
    event.preventDefault();
  }

  @bind
  handleSliderMouseDown(event: MouseEvent): void {
    if ((<HTMLElement>event.target).className === 'slider__thumb-marker') {
      this.startSelect();
      this.activeThumbNum = this.slider.thumblers.indexOf((<HTMLElement>event.target).closest('.slider__thumb'));
    }
  }

  handleDocumentMouseUp(): void {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleSliderClick);
  }

  @bind
  handleSliderClick(event: MouseEvent): void {
    let width: number;
    let coord: number;
    this.transitionDuration(event);
    if (this.options.isVertical) {
      width = this.slider.track.clientHeight;
      coord = Math.round((<MouseEvent>event).clientY - this.slider.track.getBoundingClientRect().top);
    }
    else {
      width = this.slider.track.clientWidth;
      coord = Math.round((<MouseEvent>event).clientX- this.slider.track.getBoundingClientRect().left);
    }
    if (coord < 0) {
      coord = 0;
    }
    if (coord > width) {
      coord = width;
    }

    const index = this.selectedThumb({ coord: coord, width: width, thumblers: this.slider.thumblers, event: event});

    this.inputChanged.notify({trackWidth: width, position: coord, index: index});
  }

  startSelect(): void {
    document.addEventListener('mousemove', this.handleSliderClick);
    this.handleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  transitionDuration(event: MouseEvent): void {
    if (event.type === 'click') {
      this.slider.container.style.setProperty('--transition', '0.5s');
    }
    else {
      this.slider.container.style.setProperty('--transition', '0');
    }
  }

  selectedThumb(data: {coord: number, width: number, thumblers: Array<HTMLElement>, event: MouseEvent}): number {
    const { coord, width, thumblers, event } = data;
    let index = 0;
    if (this.options.isRange) {
      const min = this.options.isVertical ? parseInt(thumblers[0].style.top) : parseInt(thumblers[0].style.left);
      const max = this.options.isVertical ? parseInt(thumblers[1].style.top) : parseInt(thumblers[1].style.left);
      const pos = coord*100/width;
      if (event.type === 'mousemove') {
        index = this.activeThumbNum;
      }
      if ( (pos - min) < 0) {
        this.activeThumbNum = 0;
        index = 0;
      }
      if ( (pos - max) > 0) {
        this.activeThumbNum = 1;
        index = 1;
      }
      if ( (pos - min) > (max - pos) && event.type === 'click') {
        index = 1;
      }
    }

    return index;
  }

  update(data: {coord: number, index: number, value: string}) {
    this.slider.update(data);
  }
}
