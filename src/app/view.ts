import Slider from './slider/slider'
import { IOptions } from './options'
import EventDispatcher from './dispatcher'

export default class View {
    private _options: IOptions
    private _slider: Slider
    private _inputChanged: EventDispatcher
    
    constructor(options: IOptions) {
      this._options = options
      this._slider = new Slider(options).createSlider()
      this._inputChanged = new EventDispatcher(this)
      let _ranger = this
   
      this._slider.track.addEventListener('click', _ranger.onSelect.bind(_ranger))

      this._slider.label.scale.addEventListener('click', _ranger.onSelect.bind(_ranger))

      this._slider.track.addEventListener('mousedown', _ranger.onMouseDown.bind(_ranger))
      
      this._slider.track.addEventListener('dragstart', () => {
        return false 
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
      
      let index = this.selectedThumb(coord, width, this._slider.thumblers)

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
    selectedThumb(coord: number, width: number, thumblers: Array<HTMLElement>) {
      let index = 0
      
      if (this._options.type === 2) {
        let arr = [];
        thumblers.forEach((el: HTMLElement) => {
          let dist: number
          if (this._options.direction === "vertical") {
            dist = Math.abs(coord - parseInt(el.style.top)*width/100)
          }
          else {
            dist = Math.abs(coord - parseInt(el.style.left)*width/100)
          }
          arr.push(dist) 
        })
        index = arr.indexOf(Math.min(...arr))
      }
      return index
    }
    callCommand(trackWidth: number, position: number, index: number) {
      this._inputChanged.notify({trackWidth: trackWidth, position: position, index: index});
    }
}

