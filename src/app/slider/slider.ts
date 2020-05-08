import Thumb from './__thumb/thumb'
import Tagmark from './__tagmark/tagmark'
import Scale from './__scale/scale'
import { IOptions } from '../options'
import Data from '../data'

export default class Slider {
    private _container: HTMLElement
    private _value: HTMLInputElement
    private _tag: HTMLElement
    private _track: HTMLElement
    private _bar: HTMLElement
    private _barSelected: HTMLElement
    private _label: Scale
    private _thumblers: Array<HTMLElement>
    private _tagmarks: Array<HTMLElement>
    private _settings: IOptions
    
    constructor(options: IOptions) {
      this._container = this.createElement('div', this.checkDirection(options.direction));
      this._tag = this.createElement('div', 'slider__tag');
      this._value = this.createInput('text');
      this._track = this.createElement('div', 'slider__track');
      this._bar = this.createElement('div', 'track__bar');
      this._barSelected = this.createElement('div', 'track__bar_selected');
      this._label = new Scale().addScale(options);
      this._thumblers = this.createThumblers(options.type);
      this._tagmarks = this.createTagmarks(options.type, options.tagmark);
      this._settings = options
    }
    get thumblers() {
      return this._thumblers
    }
    get tagmarks() {
      return this._tagmarks
    }
    get label() {
      return this._label
    }
    get track() {
      return this._track
    }
    get container() {
      return this._container
    }
    get barSelected() {
      return this._barSelected
    }
    get value() {
      return this._value
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
    createSlider() {
      this._container.append(this._value, this._tag, this._track, this._label.scale);
      this._track.append(this._bar, this._barSelected);    
      this._tag.append(...this._tagmarks);
      this._track.append(...this._thumblers);
      this._container.style.setProperty('--active-color', this._settings.color); 
      return this;
    }
    createTagmarks(type: number, isVisible: boolean) {
      this._tagmarks = []
      for (let i=0; i<type; i++) {
        this._tagmarks.push(new Tagmark(isVisible).tagmark)
      }
      return this._tagmarks
    }
    createThumblers(type: number) {
      this._thumblers = []
      for (let i=0; i<type; i++) {
        this._thumblers.push(new Thumb().createThumb())
      }
      return this._thumblers
    }
    checkDirection(direction: string) {
      if (direction === 'vertical') {
        return 'slider slider-vertical'
      }
      else {
        return 'slider'
      }
    }
    
    update(data: Array<Data>) {
      let arr = []
      let prefix = this._settings.prefix ? this._settings.prefix + " " : ""
      for (let i=0; i<data.length; i++) {
          this._tagmarks[i].textContent = prefix + data[i].value
        arr.push(data[i].value);
        this.moveThumbs(data[i], i);
      }
      this.moveBar(data);
      this._value.value = arr.join(";")
    }
    moveThumbs(data: Data, index: number) {
      if (this._settings.direction === "vertical") {
        this._thumblers[index].style.top = data.coord + "%"
        this._tagmarks[index].style.top = data.coord - 5 + "%"
      }
      else {
        this._thumblers[index].style.left = data.coord + "%"
        this._tagmarks[index].style.left = data.coord - (this._tagmarks[index].clientWidth/this._track.clientWidth)*50 + "%"
      }
    }
    moveBar(data: Array<Data>) {
      let barStart: string
      let barEnd: string
      if (data.length > 1) {
        barStart = data[0].coord + "%"
        barEnd = 100 - data[1].coord + "%"
      }
      else {
        barStart = 0 + "%"
        barEnd = 100 - data[0].coord + "%"
      }
      if (this._settings.direction === 'vertical') {
        this._barSelected.style.top = barStart;
        this._barSelected.style.bottom = barEnd;
      }
      else {
        this._barSelected.style.left = barStart;
        this._barSelected.style.right = barEnd;
      }
    }
  }