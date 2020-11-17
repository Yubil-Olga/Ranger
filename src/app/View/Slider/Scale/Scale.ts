import { IOptions } from '../../../IOptions';

export default class Scale {
  public scale: HTMLElement

  constructor(trackElement: HTMLElement, options: IOptions) {
    this.createTemplate(trackElement);
    this.init(options);
  }

  createTemplate(trackElement: HTMLElement): void {
    this.scale = document.createElement('div');
    this.scale.className = 'perfect-slider__scale';
    trackElement.append(this.scale);
  }

  init(options: IOptions) {
    if (options.values) {
      const percent = 100 / (options.values.length - 1);
      options.values.forEach((el, index) => {
        const position = index * percent + '%';
        this.addMark(el, options.isVertical, position);
      });
    } else {
      const count: number = Math.ceil((options.end - options.start) / options.scaleStep) + 1;
      const percent = (options.scaleStep / (options.end - options.start)) * 100;
      Array(count).fill('').forEach((el,index) => {
        const tag = index * options.scaleStep + options.start < options.end
          ? (index * options.scaleStep + options.start).toString()
          : options.end.toString();
        const position = index * percent < 100
          ? index * percent + '%'
          : '100%';
        this.addMark(tag, options.isVertical, position);
      });
    }
  }

  addMark(tag: string, isVertical: boolean, position: string): void {
    const labelMark = document.createElement('span');
    labelMark.className = 'perfect-slider__scale-mark';
    labelMark.setAttribute('data-text', tag);
    if (isVertical) {
      labelMark.style.top = position;
    } else {
      labelMark.style.left = position;
    }
    this.scale.append(labelMark);
  }
}
