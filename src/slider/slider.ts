export default class Slider {
    public _container: HTMLElement
    private _title: HTMLElement
    private _value: HTMLInputElement
    private _tag: HTMLElement
    private _mark: HTMLElement
    private _track: HTMLElement
    private _bar: HTMLElement
    private _barSelected: HTMLElement
    private _thumb: HTMLElement
    private _label: HTMLElement
    private _thumbMarker: HTMLElement
    
    constructor() {
      this._container = document.createElement('div')
      
      this._tag = document.createElement('div')
      
      this._mark = document.createElement('span')
      
      this._title = document.createElement('h3');
      
      this._value = document.createElement('input');
      
      this._track = document.createElement('div');
      
      this._bar = document.createElement('div')
      
      this._barSelected = document.createElement('div')
      
      this._label = document.createElement('div');
  
      this._thumb = document.createElement('div');
  
      this._thumbMarker = document.createElement('span');
      
    }
    details() {
      this._container.className = 'slider'
      this._tag.className = 'slider__tag'
      this._mark.className = 'tag__mark'
      this._mark.textContent = "0"
      this._title.className = 'slider__title'
      this._title.textContent = 'Total: '
      this._value.type = "text"
      this._track.className = "slider__track"
      this._bar.className = 'track__bar'
      this._barSelected.className = 'track__bar_selected'
      this._label.className = "slider__label"
      this._thumb.className = "slider__thumb"
      this._thumbMarker.className = "thumb__marker"
    }
    create() {
      this.details()
      this._container.append(this._title, this._value, this._tag, this._track, this._label)
      this._tag.append(this._mark)
      this._track.append(this._bar, this._barSelected, this._thumb)
      this._thumb.append(this._thumbMarker)
      
      return this
    }
    tagmarkVisibility() {
      this._tag.style.display = 'none' 
    }
    colorScheme(color: string) {
      this._container.style.setProperty('--active-color', color)
    }
    thumbShape(shape: string) {
      if (shape === "square") {
        this._thumbMarker.style.borderRadius = "4px"
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
      if (typeof options.end == 'number' && typeof options.scalestep == 'number') {
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
      if (typeof options.start === 'number') {
        this.addMark(options.start, options.direction, "0");
      }
      if (typeof options.end === 'number') {
        this.addMark(options.end, options.direction, "100%");
      }
    }
  }