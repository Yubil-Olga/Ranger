export default class Slider {
    public _container: HTMLElement
    public _value: HTMLInputElement
    public _tag: HTMLElement
    public  _track: HTMLElement
    public  _bar: HTMLElement
    public  _barSelected: HTMLElement
    public _label: HTMLElement
    public _thumblers: any
    public _tagmarks: any
    
    constructor() {
      this._container = this.createElement('div', 'slider')
      this._tag = this.createElement('div', 'slider__tag')
      this._value = this.createInput('text');
      this._track = this.createElement('div', 'slider__track');
      this._bar = this.createElement('div', 'track__bar')
      this._barSelected = this.createElement('div', 'track__bar_selected')
      this._label = this.createElement('div', 'slider__label');
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
    createThumbler() {
      let thumb = this.createElement("div", "slider__thumb");
      let thumbmark = this.createElement("span", "thumb__marker");
      thumb.append(thumbmark);
      let tagmark = this.createElement('span', 'tag__mark');
      this._tagmarks.push(tagmark);
      return thumb;
    }
    createSlider(options: any) {
      this._container.append(this._value, this._tag, this._track, this._label)
      this._track.append(this._bar, this._barSelected)    

      for (let i=0; i<options.type; i++) {
        this._thumblers.push(this.createThumbler())
      }
      this._tag.append(...this._tagmarks)
      this._track.append(...this._thumblers)
      
      this.checkDirection(options.direction)
      this.tagmarkVisibility(options.tagmark)
      this.colorScheme(options)
      this.addLabel(options)
      this.addScale(options)

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
      this._label.append(labelMark);
    }
    addScale(options: any) {
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
        
        for (let i=1; i<count; i++) {
          let tag = (i*options.scalestep + options.start).toString();
          let position = i*percent + "%"
          this.addMark(tag, options.direction, position)
        }
      }
      
    }
    addLabel(options:any) {
      if (!options.values) {
        this.addMark(options.start, options.direction, "0");
        this.addMark(options.end, options.direction, "100%");
      }
    }
  }