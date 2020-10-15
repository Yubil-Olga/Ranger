import IOptions from '../../../IOptions';

export default class Scale {
  private scale: HTMLElement

  constructor(options: IOptions) {
    this.addScale(options);
  }

  public getElement(): HTMLElement {
    return this.scale;
  }

  addMark(tag: string, isVertical: boolean, position: string): void {
    const labelMark = document.createElement('span');
    labelMark.className = 'slider__label-mark';
    labelMark.setAttribute('data-text', tag);
    if (isVertical) {
      labelMark.style.top = position;
    } else {
      labelMark.style.left = position;
    }
    this.scale.append(labelMark);
  }

  addScale(options: IOptions): void {
    this.scale = document.createElement('div');
    this.scale.className = 'slider__label';
    if (options.values) {
      const count = options.values.length;
      const percent = 100/(count-1);
      for (let i=0; i<count; i++) {
        const position = i*percent + '%';
        this.addMark(options.values[i].toString(), options.isVertical, position);
      }
    } else {
      const count = Math.ceil((options.end - options.start)/options.scaleStep);
      const percent = (options.scaleStep/(options.end - options.start))*100;

      for (let i=0; i<count+1; i++) {
        let tag = (i*options.scaleStep + options.start).toString();
        let position = i*percent + '%';
        if (Number(tag) > options.end) {
          tag = options.end.toString();
          position = '100%';
        }
        this.addMark(tag, options.isVertical, position);
      }
    }
  }
}
