import Thumb from './Thumb/Tumb';
import Scale from './Scale/Scale';
import IOptions from '../../IOptions';

export default class Slider {
  public container: HTMLElement
  public value: HTMLInputElement
  public tag: HTMLElement
  public track: HTMLElement
  public bar: HTMLElement
  public barSelected: HTMLElement
  public label: HTMLElement
  public thumblers: Array<HTMLElement>
  public tagmarks: Array<HTMLElement>
  public options: IOptions

  constructor(options: IOptions) {
    this.options = options;
    this.createTemplate();
  }

  private createTemplate() {
    this.container = document.createElement('div');
    this.container.className = this.options.isVertical ? 'slider slider_vertical' : 'slider';
    this.tag = document.createElement('div');
    this.tag.className = this.options.hasTagmark ? 'slider__tag' : 'slider__tag slider__tag_hidden';
    this.value = this.createInput('text', 'slider__input');
    this.track = this.createElement('div', 'slider__track');
    this.bar = this.createElement('div', 'slider__track-bar');
    this.barSelected = this.createElement('div', 'slider__track-bar_selected');
    this.label = new Scale(this.options).getElement();
    this.thumblers = this.createThumblers(this.options.isRange);
    this.tagmarks = this.createTagmarks(this.options.isRange);
    this.container.append(this.value, this.tag, this.track, this.label);
    this.track.append(this.bar, this.barSelected);
    this.tag.append(...this.tagmarks);
    this.track.append(...this.thumblers);
    this.setColor(this.options.color);
  }

  private createInput(type: string, className: string): HTMLInputElement {
    const el = document.createElement('input');
    el.type = type;
    el.className = className;
    return el;
  }

  private createElement(tag: string, className: string): HTMLElement {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }

  private createTagmarks(isRange: boolean): Array<HTMLElement> {
    this.tagmarks = [];
    const amount = isRange ? 2 : 1;
    for (let i=0; i<amount; i++) {
      const tagmark = document.createElement('span');
      tagmark.className = 'slider__tag-mark';
      this.tagmarks.push(tagmark);
    }
    return this.tagmarks;
  }

  private createThumblers(isRange: boolean): Array<HTMLElement> {
    this.thumblers = [];
    const amount = isRange ? 2 : 1;
    for (let i=0; i<amount; i++) {
      this.thumblers.push(new Thumb().getElement());
    }
    return this.thumblers;
  }

  update(data: {coord: number, index: number, value: string}): void {
    const { coord, index, value } = data;
    const prefix = this.options.prefix ? ' ' + this.options.prefix : '';
    this.tagmarks[index].textContent = value + prefix;
    this.moveThumbs(index, coord);
    this.moveBar(index, coord);
    const arr = [];
    this.tagmarks.forEach(tagmark => {
      arr.push(tagmark.textContent.split(' ')[0]);
    });
    this.value.value = arr.join(';');
  }

  moveThumbs(index: number, coord: number): void {
    if (this.options.isVertical) {
      this.thumblers[index].style.top = coord + '%';
      this.tagmarks[index].style.top = coord - 3 + '%';
    }
    else {
      this.thumblers[index].style.left = coord + '%';
      this.tagmarks[index].style.left = coord - (this.tagmarks[index].clientWidth/this.track.clientWidth)*50 + '%';
    }
  }

  moveBar(index: number, coord: number): void {
    if (this.options.isRange && index === 0) {
      this.moveBarFrom(coord);
    } else {
      this.moveBarTo(coord);
    }
  }

  moveBarFrom(coord: number) {
    const barStart = coord + '%';
    if (this.options.isVertical) {
      this.barSelected.style.top = barStart;
    } else {
      this.barSelected.style.left = barStart;
    }
  }

  moveBarTo(coord: number) {
    const barEnd = 100 - coord + '%';
    if (this.options.isVertical) {
      this.barSelected.style.bottom = barEnd;
    } else {
      this.barSelected.style.right = barEnd;
    }
  }
  setColor(color: string) {
    if (CSS.supports('background', color)) {
      this.container.style.setProperty('--active-color', color);
    }
  }
}
