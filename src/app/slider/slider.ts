import Thumb from './__thumb/thumb'
import Tagmark from './__tagmark/tagmark'
import Scale from './__scale/scale'

export default class Slider {
    public _container: HTMLElement
    public _value: HTMLInputElement
    public _tag: HTMLElement
    public _track: HTMLElement
    public _bar: HTMLElement
    public _barSelected: HTMLElement
    public _label: any
    public _thumblers: any
    public _tagmarks: any
    
    constructor() {
      this._container = this.createElement('div', 'slider')
      this._tag = this.createElement('div', 'slider__tag')
      this._value = this.createInput('text');
      this._track = this.createElement('div', 'slider__track');
      this._bar = this.createElement('div', 'track__bar')
      this._barSelected = this.createElement('div', 'track__bar_selected')
      this._label = new Scale()
      this._thumblers = [];
      this._tagmarks = [];
    }
    createInput(type: string) {
      let el = document.createElement("input");
      el.type = type;
      return el;
    }
    createElement(tag: string, classname: string) {
      let el = document.createElement(tag);
      el.className = classname;
      return el;
    }
    createSlider(options: any) {
      this._container.append(this._value, this._tag, this._track, this._label._scale)
      this._track.append(this._bar, this._barSelected)    

      for (let i=0; i<options.type; i++) {
        this._thumblers.push(new Thumb().createThumb())
        this._tagmarks.push(new Tagmark().tagmark)
      }
      this._tag.append(...this._tagmarks)
      this._track.append(...this._thumblers)
      
      this.checkDirection(options.direction)
      this.tagmarkVisibility(options.tagmark)
      this.colorScheme(options)
      this._label.addScale(options)

      return this
    }
    tagmarkVisibility(tagmark: boolean) {
      if (!tagmark) {
        this._tag.style.display = 'none' 
      }
    }
    colorScheme(options: any) {
      if (options.color) {
        this._container.style.setProperty('--active-color', options.color)
      }
    }
    checkDirection(direction: string) {
      if (direction === 'vertical') {
        this._container.classList.add('slider-vertical')
      }
    }
  }