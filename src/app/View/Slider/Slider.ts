import bind from 'bind-decorator';

import EventDispatcher from '../../EventDispatcher/EventDispatcher';
import { IOptions } from '../../IOptions';
import Handle from './Handle/Handle';
import Scale from './Scale/Scale';
import Bar from './Bar/Bar';

class Slider {
  public slider: HTMLElement
  public bar: Bar
  public scale: Scale
  public options: IOptions
  public handles: Array<Handle>
  public activeHandleIndex: number
  public dispatcher: EventDispatcher = new EventDispatcher();
  public shift: {x: number, y: number}


  constructor(options: IOptions) {
    this.options = options;
    this.createTemplate();
    this.bindEventListeners();
    this.addDispatcher();
  }

  public getElement() {
    return this.slider;
  }

  public removeEventListeners() {
    this.slider.removeEventListener('click', this.handleSliderMouseDown);
    this.handles.forEach((handle) => handle.removeEventListeners());
    this.slider.removeEventListener('dragstart', this.handleSliderStopDrag);
  }

  @bind
  public handleSliderMouseDown(event: MouseEvent) {
    this.setTransitionDuration(<HTMLElement>event.currentTarget);

    if (event.currentTarget === this.slider) {
      this.shift = {
        x: 0,
        y: 0
      };
    }

    const width: number = this.options.isVertical
      ? this.slider.clientHeight
      : this.slider.clientWidth;

    const positionInPixels: number = this.options.isVertical
      ? Math.round((<MouseEvent>event).clientY - this.slider.getBoundingClientRect().top - this.shift.y)
      : Math.round((<MouseEvent>event).clientX - this.slider.getBoundingClientRect().left - this.shift.x);

    const positionInPercents = positionInPixels <= 0
      ? 0
      : positionInPixels >= width ? 100 : positionInPixels*100/width;

    this.activeHandleIndex = this.getActiveHandleIndex({
      positionInPercents: positionInPercents,
      handles: this.handles
    });
    this.dispatcher.notify({ positionInPercents: positionInPercents, index: this.activeHandleIndex });
  }

  @bind
  public handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleSliderMouseDown);
  }

  public getActiveHandleIndex(data: {positionInPercents: number, handles: any}): number {
    const { positionInPercents, handles } = data;

    let index = 0;

    if (this.options.isRange) {
      const min = handles[0].getCurrentPosition();
      const max = handles[1].getCurrentPosition();

      const isMaxHandleSelected: boolean =
        (positionInPercents - max) > 0 ||
        (positionInPercents - min) > (max - positionInPercents);

      index = isMaxHandleSelected ? 1 : 0;
    }

    return index;
  }

  public update(data: {positionInPercents: number, index: number, value: string}): void {
    const { positionInPercents, index, value } = data;

    this.handles[index].moveHandle({
      positionInPercents: positionInPercents,
      isVertical: this.options.isVertical
    });

    if (this.options.hasTagmark) {
      const prefix = this.options.prefix ? ' ' + this.options.prefix : '';
      const tagmark = value + prefix;
      this.handles[index].updateTagmarkValue(tagmark);
    }

    this.bar.moveBar({
      index: index,
      positionInPercents: positionInPercents,
      isRange: this.options.isRange,
      isVertical: this.options.isVertical
    });
  }

  public setTransitionDuration(currentTarget: HTMLElement): void {
    const transition = currentTarget === this.slider ? '0.5s' : '0';
    this.slider.style.setProperty('--transition', transition);
  }

  private createTemplate() {
    this.slider = document.createElement('div');
    this.slider.className = 'perfect-slider__track';
    this.bar = new Bar(this.slider);
    this.scale = new Scale(this.slider, this.options);
    this.handles = this.createHandles(this.options.isRange);
  }

  private bindEventListeners() {
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.addEventListener('dragstart', this.handleSliderStopDrag);
    window.addEventListener('resize', this.handleWindowResize);
  }

  private createHandles(isRange: boolean): Array<Handle> {
    const data = isRange ? [0,1] : [0];
    this.handles = [];
    data.forEach(() => this.handles.push(new Handle(this.slider, this.options.hasTagmark)));
    return this.handles;
  }

  @bind
  private handleWindowResize() {
    this.handles.forEach((handle, index) => {
      handle.moveHandle({
        positionInPercents: handle.getCurrentPosition(),
        isVertical: this.options.isVertical
      });
      this.bar.moveBar({
        index: index,
        positionInPercents: handle.getCurrentPosition(),
        isRange: this.options.isRange,
        isVertical: this.options.isVertical
      });
    });
  }

  private handleSliderStopDrag(event: MouseEvent) {
    event.preventDefault();
  }

  private addDispatcher() {
    this.handles.forEach((handle) => {
      handle.dispatcher.attach((shift) => this.moveHandle(shift));
    });
  }

  private moveHandle(shift: {x: number, y: number}) {
    this.shift = shift;
    document.addEventListener('mousemove', this.handleSliderMouseDown);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }
}

export default  Slider;