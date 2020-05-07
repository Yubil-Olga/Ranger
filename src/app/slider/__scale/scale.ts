import { IOptions } from '../../options'
export default class Scale {
    private _scale: HTMLElement
    constructor() {
        this._scale = document.createElement('div');
        this._scale.className = 'slider__label'
    }
    get scale() {
      return this._scale
    }
    addMark(tag: string, direction: string, position: string) {
        let labelMark = document.createElement('span')
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
    addScale(options: IOptions) {
        if (options.values) {
            let count = options.values.length;
            let percent = 100/(count-1);
            for (let i=0; i<count; i++) {
              let position = i*percent + "%";
              this.addMark(options.values[i].toString(), options.direction, position)
            }
          }
          else {
            let count = Math.round((options.end - options.start)/options.scalestep)
            let percent = (options.scalestep/(options.end - options.start))*100
            
            for (let i=0; i<count+1; i++) {
              let tag = (i*options.scalestep + options.start).toString();
              let position = i*percent + "%"
              this.addMark(tag, options.direction, position)
            }
          }
          return this
    }
}