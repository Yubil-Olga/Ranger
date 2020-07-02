import { IOptions } from '../../options'
export default class Scale {
    private _scale: HTMLElement
    constructor() {
        this._scale = document.createElement('div');
        this._scale.className = 'slider__label'
    }
    get scale(): HTMLElement {
      return this._scale
    }
    addMark(tag: string, direction: string, position: string): void {
        const labelMark = document.createElement('span')
        labelMark.className = 'label__mark'
        labelMark.setAttribute("data-text", tag)
        if (direction == 'vertical') {
            labelMark.style.top = position
        }
        else {
            labelMark.style.left = position
        }
        this._scale.append(labelMark);
    }
    addScale(options: IOptions): Scale {
        if (options.values) {
            const count = options.values.length;
            const percent = 100/(count-1);
            for (let i=0; i<count; i++) {
              const position = i*percent + '%';
              this.addMark(options.values[i].toString(), options.direction, position)
            }
          }
          else {
            const count = Math.ceil((options.end - options.start)/options.scalestep)
            const percent = (options.scalestep/(options.end - options.start))*100
            
            for (let i=0; i<count+1; i++) {
              let tag = (i*options.scalestep + options.start).toString();
              let position = i*percent + '%'
              if (Number(tag) > options.end) {
                tag = options.end.toString();
                position = '100%'
              }
              this.addMark(tag, options.direction, position)
            }
          }
          return this
    }
}