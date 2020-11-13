import bind from 'bind-decorator';
import Handle from './Handle/Handle';
import Scale from './Scale/Scale';
import Bar from './Bar/Bar';
import EventDispatcher from '../../EventDispatcher/EventDispatcher';
import { IOptions } from '../../IOptions';

export default class Slider {
  public slider: HTMLElement
  public bar: Bar
  public scale: Scale
  public options: IOptions
  public handles: Array<Handle>
  public activeHandleIndex: number
  public dispatcher: EventDispatcher = new EventDispatcher();

  constructor(options: IOptions) {
    this.options = options;
    this.createTemplate();
    this.bindEventListeners();
  }

  getElement() {
    return this.slider;
  }

  private createTemplate() {
    this.slider = document.createElement('div');
    this.slider.className = 'perfect-slider__track';
    this.bar = new Bar(this.slider);
    this.scale = new Scale(this.slider, this.options);
    this.handles = this.createHandles(this.options.isRange);
  }

  bindEventListeners() {
    this.slider.addEventListener('click', this.handleSliderClick);
    this.handles.forEach((handle) => handle.handle.addEventListener('mousedown', this.handleHandleMouseDown));
    this.slider.addEventListener('dragstart', this.handleSliderStopDrag);
  }

  removeEventListeners() {
    this.slider.removeEventListener('click', this.handleSliderClick);
    this.handles.forEach((handle) => handle.handle.removeEventListener('mousedown', this.handleHandleMouseDown));
    this.slider.removeEventListener('dragstart', this.handleSliderStopDrag);
  }

  handleSliderStopDrag(event: MouseEvent) {
    event.preventDefault();
  }

  @bind
  handleSliderClick(event: MouseEvent) {
    this.setTransitionDuration(event);

    const width: number = this.options.isVertical
      ? this.slider.clientHeight
      : this.slider.clientWidth;

    const positionInPixels: number = this.options.isVertical
      ? Math.round((<MouseEvent>event).clientY - this.slider.getBoundingClientRect().top)
      : Math.round((<MouseEvent>event).clientX- this.slider.getBoundingClientRect().left);

    const isPositionValid: boolean = positionInPixels >= 0
      && positionInPixels <= width;

    if (!isPositionValid) return;

    const positionInPercents = positionInPixels*100/width;

    this.activeHandleIndex = this.getActiveHandleIndex({
      positionInPercents: positionInPercents,
      handles: this.handles
    });

    this.dispatcher.notify({ positionInPercents: positionInPercents, index: this.activeHandleIndex });
  }

  @bind
  handleHandleMouseDown() {
    document.addEventListener('mousemove', this.handleSliderClick);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  @bind
  handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleSliderClick);
  }

  getActiveHandleIndex(data: {positionInPercents: number, handles: any}): number {
    const { positionInPercents, handles } = data;

    let index = 0;

    if (this.options.isRange) {
      const min = handles[0].getCurrentPosition();
      const max = handles[1].getCurrentPosition();

      const isMaxThumblerSelected: boolean =
        (positionInPercents - max) > 0 ||
        (positionInPercents - min) > (max - positionInPercents);

      index = isMaxThumblerSelected ? 1 : 0;
    }

    return index;
  }

  private createHandles(isRange: boolean): Array<Handle> {
    const data = isRange ? [0,1] : [0];
    this.handles = [];
    data.forEach(() => this.handles.push(new Handle(this.slider, this.options.hasTagmark)));
    return this.handles;
  }

  update(data: {positionInPercents: number, index: number, value: string}): void {
    const { positionInPercents, index, value } = data;
    const prefix = this.options.prefix ? ' ' + this.options.prefix : '';
    const tagmark = value + prefix;

    this.handles[index].updateHandlePosition({
      positionInPercents: positionInPercents,
      isVertical: this.options.isVertical,
      tagmark: tagmark
    });

    this.bar.moveBar({
      index: index,
      positionInPercents: positionInPercents,
      isRange: this.options.isRange,
      isVertical: this.options.isVertical
    });
  }

  setTransitionDuration(event: MouseEvent): void {
    const transition = event.type === 'click' ? '0.5s' : '0';
    this.slider.style.setProperty('--transition', transition);
  }
}
