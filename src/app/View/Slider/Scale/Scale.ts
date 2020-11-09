import { IOptions } from '../../../IOptions';

export default class Scale {
  private trackElement: HTMLElement
  public scale: HTMLElement

  constructor(trackElement: HTMLElement, options: IOptions) {
    this.trackElement = trackElement;
    this.createTemplate(options);
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

  createTemplate(options: IOptions): void {
    this.scale = document.createElement('div');
    this.scale.className = 'perfect-slider__scale';
    if (options.values) {
      const percent = 100/(options.values.length - 1);
      options.values.forEach((el, index) => {
        const position = index*percent + '%';
        this.addMark(el, options.isVertical, position);
      });
    } else {
      const count: number = Math.ceil((options.end - options.start)/options.scaleStep) + 1;
      const percent = (options.scaleStep/(options.end - options.start))*100;
      Array(count).fill('').forEach((el,index) => {
        let tag = (index*options.scaleStep + options.start).toString();
        let position = index*percent + '%';
        if (Number(tag) > options.end) {
          tag = options.end.toString();
          position = '100%';
        }
        this.addMark(tag, options.isVertical, position);
      });
    }
    this.trackElement.append(this.scale);
  }
}
