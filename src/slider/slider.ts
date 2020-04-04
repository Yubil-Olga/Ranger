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
      this._title.className = 'slider__title';
      this._title.textContent = 'Total: '
      this._value.type = "text";
      this._title.className = "slider__track";
      this._track.className = "slider__track"
      this._bar.className = 'track__bar'
      this._barSelected.className = 'track__bar_selected'
      this._label.className = "slider__label";
      this._thumb.className = "slider__thumb"
      this._thumbMarker.className = "thumb__marker"
    }
    create() {
      this.details()
      this._container.append(this._title, this._value, this._tag, this._track, this._label)
      this._tag.append(this._mark)
      this._track.append(this._bar, this._barSelected, this._thumb)
      this._thumb.append(this._thumbMarker)
      for (let i=0; i<5; i++) {
        let labelMark = document.createElement('span')
        labelMark.className = 'label__mark'
        labelMark.setAttribute("data-text", (i*25).toString())
        this._label.append(labelMark)
      }
      return this
    }
  }