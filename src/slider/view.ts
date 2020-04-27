import Slider from './slider'
import eventDispatcher from './dispatcher'

export default class View {
    private _options: any
    private _slider: any
    private _inputChanged: any
    constructor() {
      this._slider = new Slider()
      this._inputChanged = new eventDispatcher(this)
      let _ranger = this

      this._slider._track.addEventListener('click', function() {
        _ranger._slider._container.style.setProperty('--transition', "0.5s")
        _ranger.onSelect()
      })

      this._slider._track.addEventListener('mousedown', function(e: any) {
        let mousemove = _ranger.onSelect.bind(_ranger)
        if (e.target.className === "thumb__marker") {
          _ranger._slider._container.style.setProperty('--transition', "0")
          startSelect()  
        }
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
      
      this._slider._track.addEventListener('dragstart', () => {
        return false
      })
    }
    get slider() {
      return this._slider
    }
    createSlider(elem: HTMLElement, options: any) {
      this._options = options
      this._slider.createSlider(options)
      elem.append(this._slider._container)  
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
        coord = Math.round((<MouseEvent>event).clientX - this._slider._track.getBoundingClientRect().left)
      }
      if (coord < 0) {
        coord = 0
      }
      if (coord > width) {
        coord = width
      }
      
      let index = this.selectedThumb()
      this.callCommand(width, coord, index); 
    }
    selectedThumb() {
      let index = 0
      if (this._options.type === 2) {
        let arr = [];
        this._slider._thumblers.forEach((e: any) => {
          let dist: number
          if (this._options.direction === "vertical") {
            dist = Math.abs((<MouseEvent>event).clientY - e.getBoundingClientRect().top);
          }
          else {
            dist = Math.abs((<MouseEvent>event).clientX - e.getBoundingClientRect().left);
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
    
    update(data: any) {
      let arr = []
      let prefix = this._options.prefix ? this._options.prefix + " " : ""
      for (let i=0; i<data.length; i++) {
        this._slider._tagmarks[i].textContent = prefix + data[i].value
        arr.push(data[i].value);
        this.moveThumbs(data, i);
      }
      this.moveBar(data);
      this._slider._value.value = arr.join(";")
    }

    moveThumbs(data: any, index: number) {
      if (this._options.direction === "vertical") {
        this._slider._thumblers[index].style.top = data[index].coord + "%"
        this._slider._tagmarks[index].style.top = data[index].coord - 5 + "%"
      }
      else {
        this._slider._thumblers[index].style.left = data[index].coord + "%"
        this._slider._tagmarks[index].style.left = data[index].coord - (this._slider._tagmarks[index].clientWidth/this._slider._track.clientWidth)*50 + "%"
      }
    }
    moveBar(data: any) {
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
      if (this._options.direction === 'vertical') {
        this._slider._barSelected.style.top = barStart;
        this._slider._barSelected.style.bottom = barEnd;
      }
      else {
        this._slider._barSelected.style.left = barStart;
        this._slider._barSelected.style.right = barEnd;
      }
    }
}