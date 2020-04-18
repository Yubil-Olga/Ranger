import Slider from './slider'
import eventDispatcher from './dispatcher'

export default class View {
    private _slider: any
    private _inputChanged: any
    private _options: any
    constructor() {
      this._slider = new Slider().create()
      this._inputChanged = new eventDispatcher(this)
      let _ranger = this
      this._slider._track.addEventListener('click', function() {
        _ranger._slider._container.style.setProperty('--transition', "0.5s")
        _ranger.onSelect()
      })
      
      this._slider._thumbMarker.addEventListener('mousedown', function() {
        _ranger._slider._container.style.setProperty('--transition', "0")
        let mousemove = _ranger.onSelect.bind(_ranger)
        startSelect()   
        
        function startSelect() {
          event.preventDefault()
          document.addEventListener('mousemove', mousemove)
          document.addEventListener('mouseup', endSelect)
        }
  
        function endSelect() {
          document.removeEventListener('mouseup',  endSelect)
          document.removeEventListener('mousemove',  mousemove)
        }
      })  
      this._slider._thumbMarker.addEventListener('dragstart', () => {
        return false
      })
    }
    createSlider(elem: HTMLElement, options: any) {
      this._options = options
      elem.append(this._slider._container)
      if (this._options.direction == "vertical") {
        (<HTMLElement>this._slider._container).classList.add('slider-vertical')
      }
      if (typeof this._options.tagmark === "boolean" && this._options.tagmark === false) {
        this._slider.tagmarkVisibility()
      }
      if (typeof this._options.color == 'string') {
        this._slider.colorScheme(this._options.color)
      }
      if (typeof options.thumb == 'string') {
        this._slider.thumbShape(options.thumb)
      }
      this._slider.addLabel(options)
      this._slider.addScale(options)
    }
   
    onSelect() {
      let width: number
      let coord: number

      if (this._options.direction == "vertical") {
        width = this._slider._track.clientHeight
        coord = Math.round((<MouseEvent>event).clientY - this._slider._track.getBoundingClientRect().top)
      }
      else {
        width = this._slider._track.clientWidth
        coord = Math.round((<MouseEvent>event).clientX - this._slider._thumbMarker.clientWidth)
      }
      if (coord < 0) {
        coord = 0
      }
      if (coord > width) {
        coord = width
      }
      this.callCommand(width, coord)
    }
  
    callCommand(trackWidth: number, position: number) {
      this._inputChanged.notify({trackWidth: trackWidth, position: position});
    }
  
    moveThumb(pos: number) {
      if (this._options.direction == "vertical") {
        this._slider._thumb.style.top = pos + "%";
        this._slider._mark.style.top = pos - (this._slider._mark.clientHeight/this._slider._track.clientHeight)*50 + "%";
        this._slider._barSelected.style.bottom = 100 - pos + "%";
      }
      else {
        this._slider._thumb.style.left = pos + "%";
        this._slider._mark.style.left = pos - (this._slider._mark.clientWidth/this._slider._track.clientWidth)*50 + "%";
        this._slider._barSelected.style.right = 100 - pos + "%";
      } 
      // if (this._options.direction == "vertical") {
      //   this._slider._thumb.style.top = pos + "px";
      //   this._slider._mark.style.top = pos - (this._slider._mark.clientHeight/2) + "px";
      //   this._slider._barSelected.style.bottom = this._slider._track.clientHeight - pos + "px";
      // }
      // else {
      //   this._slider._thumb.style.left = pos + "px";
      //   this._slider._mark.style.left = pos - (this._slider._mark.clientWidth/2) + "px";
      //   this._slider._barSelected.style.right = this._slider._track.clientWidth - pos + "px";
      // } 
    }
    
    changeTitle(title: number) {
      this._slider._value.value = title
      this._slider._title.textContent = "Total: " + title
      this._slider._mark.textContent = title
    }
  }