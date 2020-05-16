import Slider from './slider/slider'
import { IOptions, Options } from './options'
import EventDispatcher from './dispatcher'

export default class View {
    private _options: IOptions
    private _slider: Slider
    private _inputChanged: EventDispatcher
    private _activeThumbNum: number
    
    constructor(options: IOptions) {
      this._options = options
      this._slider = new Slider(options).createSlider()
      this._inputChanged = new EventDispatcher(this)
      let _ranger = this
   
      this._slider.track.addEventListener('click', _ranger.onSelect.bind(_ranger))

      this._slider.label.scale.addEventListener('click', _ranger.onSelect.bind(_ranger))

      this._slider.track.addEventListener('mousedown', _ranger.onMouseDown.bind(_ranger))
      
      this._slider.track.addEventListener('dragstart', () => {
        event.preventDefault()
      })
    }
    get inputChanged() {
      return this._inputChanged
    }
    get slider() {
      return this._slider
    }
    appendSlider(elem: HTMLElement) {
      elem.append(this._slider.container)  
      return this
    }
    onMouseDown(event: MouseEvent) {
      if ((<HTMLElement>event.target).className === "thumb__marker") {
        this.startSelect()
        this._activeThumbNum = this._slider.thumblers.indexOf((<HTMLElement>event.target).closest('.slider__thumb'))
      }
    }
    mousemove = this.onSelect.bind(this)
    mouseup = this.endSelect.bind(this)
    startSelect() {
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    }
    endSelect() {
      document.removeEventListener('mouseup', this.mouseup)
      document.removeEventListener('mousemove', this.mousemove)
    }
    onSelect(event: MouseEvent) {
      let width: number
      let coord: number
      this.transitionDuration(event)
      if (this._options.direction == "vertical") {
        width = this._slider.track.clientHeight
        coord = Math.round((<MouseEvent>event).clientY - this._slider.track.getBoundingClientRect().top)
      }
      else {
        width = this._slider.track.clientWidth
        coord = Math.round((<MouseEvent>event).clientX- this._slider.track.getBoundingClientRect().left)
      }
      if (coord < 0) {
        coord = 0
      }
      if (coord > width) {
        coord = width
      }
      
      let index = this.selectedThumb(coord, width, this._slider.thumblers, event)
      
      this.callCommand(width, coord, index); 
    }
    transitionDuration(event: MouseEvent) {
      if (event.type === 'click') {
        this._slider.container.style.setProperty('--transition', "0.5s")
      }
      else {
        this._slider.container.style.setProperty('--transition', "0")
      }
    }
    selectedThumb(coord: number, width: number, thumblers: Array<HTMLElement>, event: MouseEvent) {
      let index = 0
      if (this._options.type === 2) {
        let min = this._options.direction === 'vertical' ? parseInt(thumblers[0].style.top) : parseInt(thumblers[0].style.left)
        let max = this._options.direction === 'vertical' ? parseInt(thumblers[1].style.top) : parseInt(thumblers[1].style.left)
        let pos = coord*100/width
        if (event.type === 'mousemove') {
          index = this._activeThumbNum
        }
        if ( (pos - min) < 0) {
          this._activeThumbNum = 0
          index = 0
        }
        if ( (pos - max) > 0) {
          this._activeThumbNum = 1
          index = 1
        }
        if ( (pos - min) > (max - pos) && event.type === 'click') {
          index = 1
        }
      }
      return index
    }
    callCommand(trackWidth: number, position: number, index: number) {
      this._inputChanged.notify({trackWidth: trackWidth, position: position, index: index});
    }
}

