import IOptions from '../../../Options/IOptions';

export default class Scale {
  private scale: HTMLElement

  constructor(options: IOptions) {
    this.addScale(options);
  }

  public getElement(): HTMLElement {
    return this.scale;
  }

  addMark(tag: string, direction: string, position: string): void {
    const labelMark = document.createElement('span');
    labelMark.className = 'label__mark';
    labelMark.setAttribute('data-text', tag);
    if (direction == 'vertical') {
      labelMark.style.top = position;
    } else {
      labelMark.style.left = position;
    }
    this.scale.append(labelMark);
  }

  private addScale(options: IOptions): void {
    this.scale = document.createElement('div');
    this.scale.className = 'slider__label';
    if (options.values) {
      const count = options.values.length;
      const percent = 100/(count-1);
      for (let i=0; i<count; i++) {
        const position = i*percent + '%';
        this.addMark(options.values[i].toString(), options.direction, position);
      }
    } else {
      const count = Math.ceil((options.end - options.start)/options.scalestep);
      const percent = (options.scalestep/(options.end - options.start))*100;

      for (let i=0; i<count+1; i++) {
        let tag = (i*options.scalestep + options.start).toString();
        let position = i*percent + '%';
        if (Number(tag) > options.end) {
          tag = options.end.toString();
          position = '100%';
        }
        this.addMark(tag, options.direction, position);
      }
    }
  }
}