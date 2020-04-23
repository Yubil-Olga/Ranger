export default class Slider {
    public _container: HTMLElement
    private _title: HTMLElement
    private _value: HTMLInputElement
    private _tag: HTMLElement
    private _track: HTMLElement
    private _bar: HTMLElement
    private _barSelected: HTMLElement
    private _label: HTMLElement
    private _thumblers: any
    private _tagmarks: any
    
    constructor() {
      this._container = this.createElement('div', 'slider')
      this._tag = this.createElement('div', 'slider__tag')
      this._title = this.createElement('h3', 'slider__title');
      this._value = document.createElement('input');
      this._track = this.createElement('div', 'slider__track');
      this._bar = this.createElement('div', 'track__bar')
      this._barSelected = this.createElement('div', 'track__bar_selected')
      this._label = this.createElement('div', 'slider__label');
      this._thumblers = [];
      this._tagmarks = [];
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
    createSlider(num: number) {
      this._title.textContent = 'Total: '
      this._value.type = "text"
      this._container.append(this._title, this._value, this._tag, this._track, this._label)
      this._track.append(this._bar, this._barSelected)    

      for (let i=0; i<num; i++) {
        this._thumblers.push(this.createThumbler())
      }
      this._tag.append(...this._tagmarks)
      this._track.append(...this._thumblers)
      
      return this
    }
    tagmarkVisibility() {
      this._tag.style.display = 'none' 
    }
    colorScheme(color: string) {
      this._container.style.setProperty('--active-color', color)
    }
    // thumbShape(shape: string) {
    //   // if (shape === "square") {
    //   //   this._thumbMarker.style.borderRadius = "4px"
    //   // }
    // }
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
      if (typeof options.end == 'number' && typeof options.scalestep == 'number' && !options.values) {
        let count = Math.round((options.end - options.start)/options.scalestep)
        let percent = (options.scalestep/(options.end - options.start))*100
        
        for (let i=1; i<count; i++) {
          let tag = (i*options.scalestep + options.start).toString();
          let position = i*percent + "%"
          this.addMark(tag, options.direction, position)
        }
      }
      if (options.values) {
        let count = options.values.length;
        let percent = 100/(count-1);
        for (let i=0; i<count; i++) {
          let position = i*percent + "%";
          this.addMark(options.values[i].toString(), options.direction, position)
        }
      }
    }
    addLabel(options:any) {
      if (typeof options.start === 'number' && !options.values) {
        this.addMark(options.start, options.direction, "0");
      }
      if (typeof options.end === 'number' && !options.values) {
        this.addMark(options.end, options.direction, "100%");
      }
    }
  }