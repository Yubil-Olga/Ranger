import Thumb from './Thumb/Tumb';
import Tagmark from './Tagmark/Tagmark';
import Scale from './Scale/Scale';
import IOptions from '../../Options/IOptions';
import Data from '../../Model/Data/Data';

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
    this.container = this.createElement('div', this.checkDirection(this.options.direction));
    this.tag = this.createElement('div', 'slider__tag');
    this.value = this.createInput('text', 'slider__input');
    this.track = this.createElement('div', 'slider__track');
    this.bar = this.createElement('div', 'track__bar');
    this.barSelected = this.createElement('div', 'track__bar_selected');
    this.label = new Scale(this.options).getElement();
    this.thumblers = this.createThumblers(this.options.type);
    this.tagmarks = this.createTagmarks(this.options.type, this.options.hasTagmark);
    this.container.append(this.value, this.tag, this.track, this.label);
    this.track.append(this.bar, this.barSelected);
    this.tag.append(...this.tagmarks);
    this.track.append(...this.thumblers);
    this.container.style.setProperty('--active-color', this.options.color);
    return this;
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

  private createTagmarks(type: number, isVisible: boolean): Array<HTMLElement> {
    this.tagmarks = [];
    for (let i=0; i<type; i++) {
      this.tagmarks.push(new Tagmark(isVisible).getElement());
    }
    return this.tagmarks;
  }

  private createThumblers(type: number): Array<HTMLElement> {
    this.thumblers = [];
    for (let i=0; i<type; i++) {
      this.thumblers.push(new Thumb().getElement());
    }
    return this.thumblers;
  }

  private checkDirection(direction: string): string {
    if (direction === 'vertical') {
      return 'slider slider_vertical';
    }
    else {
      return 'slider';
    }
  }

  update(data: Array<Data>): void {
    const arr = [];
    const prefix = this.options.prefix ? this.options.prefix + ' ' : '';
    for (let i=0; i<data.length; i++) {
      this.tagmarks[i].textContent = prefix + data[i].value;
      arr.push(data[i].value);
      this.moveThumbs(data[i], i);
    }
    this.moveBar(data);
    this.value.value = arr.join(';');
  }

  moveThumbs(data: Data, index: number): void {
    if (this.options.direction === 'vertical') {
      this.thumblers[index].style.top = data.coord + '%';
      this.tagmarks[index].style.top = data.coord - 3 + '%';
    }
    else {
      this.thumblers[index].style.left = data.coord + '%';
      this.tagmarks[index].style.left = data.coord - (this.tagmarks[index].clientWidth/this.track.clientWidth)*50 + '%';
    }
  }

  moveBar(data: Array<Data>): void {
    let barStart: string;
    let barEnd: string;
    if (data.length > 1) {
      barStart = data[0].coord + '%';
      barEnd = 100 - data[1].coord + '%';
    }
    else {
      barStart = 0 + '%';
      barEnd = 100 - data[0].coord + '%';
    }
    if (this.options.direction === 'vertical') {
      this.barSelected.style.top = barStart;
      this.barSelected.style.bottom = barEnd;
    }
    else {
      this.barSelected.style.left = barStart;
      this.barSelected.style.right = barEnd;
    }
  }
}