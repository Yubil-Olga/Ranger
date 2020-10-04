import Slider from './Slider/Slider';
import IOptions from '../Options/IOptions';
import EventDispatcher from '../EventDispatcher/EventDispatcher';

export default class View {
  private _options: IOptions
  private _slider: Slider
  private _activeThumbNum: number
  private _inputChanged = new EventDispatcher(this)

  constructor(options: IOptions, elem: HTMLElement) {
    this._options = options;
    this.initSlider(elem);
    this.bindEventListeners();
  }

  initSlider(elem: HTMLElement) {
    this._slider = new Slider(this._options);
    elem.append(this._slider.container);
  }

  bindEventListeners(): void {
    this.handleSliderClick = this.handleSliderClick.bind(this);
    this._slider.track.addEventListener('click', this.handleSliderClick);
    this._slider.label.scale.addEventListener('click', this.handleSliderClick);
    this.handleSliderMouseDown = this.handleSliderMouseDown.bind(this);
    this._slider.track.addEventListener('mousedown', this.handleSliderMouseDown);
    this._slider.track.addEventListener('dragstart', this.stopDrag);
  }

  get inputChanged(): EventDispatcher {
    return this._inputChanged;
  }

  get slider(): Slider {
    return this._slider;
  }

  stopDrag(event: MouseEvent): void {
    event.preventDefault();
  }

  handleSliderMouseDown(event: MouseEvent): void {
    if ((<HTMLElement>event.target).className === 'thumb__marker') {
      this.startSelect();
      this._activeThumbNum = this._slider.thumblers.indexOf((<HTMLElement>event.target).closest('.slider__thumb'));
    }
  }

  handleDocumentMouseUp(): void {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleSliderClick);
  }

  handleSliderClick(event: MouseEvent): void {
    let width: number;
    let coord: number;
    this.transitionDuration(event);
    if (this._options.direction == 'vertical') {
      width = this._slider.track.clientHeight;
      coord = Math.round((<MouseEvent>event).clientY - this._slider.track.getBoundingClientRect().top);
    }
    else {
      width = this._slider.track.clientWidth;
      coord = Math.round((<MouseEvent>event).clientX- this._slider.track.getBoundingClientRect().left);
    }
    if (coord < 0) {
      coord = 0;
    }
    if (coord > width) {
      coord = width;
    }

    const index = this.selectedThumb(coord, width, this._slider.thumblers, event);

    this.callCommand(width, coord, index);
  }

  startSelect(): void {
    document.addEventListener('mousemove', this.handleSliderClick);
    this.handleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  transitionDuration(event: MouseEvent): void {
    if (event.type === 'click') {
      this._slider.container.style.setProperty('--transition', '0.5s');
    }
    else {
      this._slider.container.style.setProperty('--transition', '0');
    }
  }

  selectedThumb(coord: number, width: number, thumblers: Array<HTMLElement>, event: MouseEvent): number {
    let index = 0;
    if (this._options.type === 2) {
      const min = this._options.direction === 'vertical' ? parseInt(thumblers[0].style.top) : parseInt(thumblers[0].style.left);
      const max = this._options.direction === 'vertical' ? parseInt(thumblers[1].style.top) : parseInt(thumblers[1].style.left);
      const pos = coord*100/width;
      if (event.type === 'mousemove') {
        index = this._activeThumbNum;
      }
      if ( (pos - min) < 0) {
        this._activeThumbNum = 0;
        index = 0;
      }
      if ( (pos - max) > 0) {
        this._activeThumbNum = 1;
        index = 1;
      }
      if ( (pos - min) > (max - pos) && event.type === 'click') {
        index = 1;
      }
    }
    return index;
  }

  callCommand(trackWidth: number, position: number, index: number): void {
    this._inputChanged.notify({trackWidth: trackWidth, position: position, index: index});
  }
}

