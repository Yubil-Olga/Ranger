import { IOptions } from '../../../IOptions';

class Scale {
  public scale: HTMLElement

  constructor(trackElement: HTMLElement, options: IOptions) {
    this.createTemplate(trackElement);
    this.init(options);
  }

  private createTemplate(trackElement: HTMLElement): void {
    this.scale = document.createElement('div');
    this.scale.className = 'perfect-slider__scale';
    trackElement.append(this.scale);
  }

  private init(options: IOptions) {
    const {isVertical, start, end, scaleStep, values} = options;

    if (values) {
      const percent = 100 / (values.length - 1);
      values.forEach((el, index) => {
        const position = index * percent + '%';
        this.addMark({tag: el, isVertical: isVertical, position: position});
      });
    } else {
      const count: number = Math.ceil((end - start) / scaleStep) + 1;
      const percent = (scaleStep / (end - start)) * 100;
      Array(count).fill('').forEach((el,index) => {
        const tag = index * scaleStep + start < end
          ? (index * scaleStep + start).toString()
          : end.toString();
        const position = index * percent < 100
          ? index * percent + '%'
          : '100%';
        this.addMark({tag: tag, isVertical: isVertical, position: position});
      });
    }
  }

  private addMark(data : {tag: string, isVertical: boolean, position: string}): void {
    const {tag, isVertical, position} = data;

    const labelMark = document.createElement('span');
    labelMark.className = 'perfect-slider__scale-mark js-perfect-slider__scale-mark';
    labelMark.setAttribute('data-text', tag);
    if (isVertical) {
      labelMark.style.top = position;
    } else {
      labelMark.style.left = position;
    }
    this.scale.append(labelMark);
  }
}

export default Scale;