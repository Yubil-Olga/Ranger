import Slider from './slider'
import eventDispatcher from './dispatcher'

export default class View {
    private _slider: any
    private _inputChanged: any
    constructor() {
      this._slider = new Slider().create()
      this._inputChanged = new eventDispatcher(this)
      let _ranger = this
      this._slider._track.addEventListener('click', function() {
        _ranger._slider._container.style.setProperty('--transition', "0.5s")
        _ranger.onSelect()
      })
      
      this._slider._thumbMarker.addEventListener('mousedown', function() {
        _ranger._slider._container.style.setProperty('--transition', 0)
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
  
    createSlider(elem: HTMLElement) {
      elem.append(this._slider._container)
    }
   
    onSelect() {
      let coord = (<MouseEvent>event).clientX - this._slider._thumbMarker.clientWidth
      if (coord < 0) {
        coord = 0
      }
      if (coord > this._slider._track.clientWidth) {
        coord = this._slider._track.clientWidth
      }
      this.callCommand(this._slider._track.clientWidth, coord)
    }
  
    callCommand(trackWidth: number, position: number) {
      this._inputChanged.notify({trackWidth: trackWidth, position: position});
    }
  
    moveThumb(pos: number) {
      this._slider._thumb.style.left = pos + "px";
      this._slider._mark.style.left = pos - (this._slider._mark.clientWidth/2) + "px";
      this._slider._barSelected.style.right = this._slider._track.clientWidth - pos + "px";
    }
    
    changeTitle(title: number) {
      this._slider._title.textContent = "Total: " + title
      this._slider._mark.textContent = title
    }
  }