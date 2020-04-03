import './index.css'

export function sum(a: number, b: number): number {
    return a + b;
}

class Slider {
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

class Event {
  _sender: any
  _listeners = []
  constructor(sender: any) {
    this._sender = sender;
  }
  attach(listener: any) {
    this._listeners.push(listener);
  }
  notify(args: any) {
    let index: number;
    for (index = 0; index < this._listeners.length; index += 1) {
        this._listeners[index](this._sender, args);
    }
  }
}

class View {
  private _slider: any
  private _inputChanged: any
  constructor() {
    this._slider = new Slider().create()
    this._inputChanged = new Event(this)
    let _ranger = this
    this._slider._track.addEventListener('click', this.onSelect.bind(this))
    this._slider._thumbMarker.addEventListener('mousedown', function() {
      _ranger._slider._container.style.setProperty('--transition', 0)
      let mousemove = _ranger.onSelect.bind(_ranger)
      startSelect()   
      
      function startSelect() {
        event.preventDefault()
        _ranger._slider._track.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', endSelect)
      }

      function endSelect() {
        document.removeEventListener('mouseup',  endSelect)
        _ranger._slider._track.removeEventListener('mousemove',  mousemove)
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
    this.callCommand(this._slider._track.clientWidth, coord)
  }

  callCommand(trackWidth: number, position: number) {
    this._inputChanged.notify({trackWidth: trackWidth, position: position});
  }

  moveThumb(pos: number) {
    this._slider._thumb.style.left = pos + "px";
    this._slider._mark.style.left = pos - (this._slider._mark.clientWidth/2) + "px";
    this._slider._barSelected.style.right = 261 - pos + "px";
  }
  
  changeTitle(title: number) {
    this._slider._title.textContent = "Total: " + title
    this._slider._mark.textContent = title
  }
}

class Model {
  private _start: number
  private _end: number
  private _currentValue: number
  private _modelChanged: any
  constructor() {
    this._start = 0
    this._end = 100
    this._currentValue = 0
    this._modelChanged = new Event(this)
  }
  valueCalculation(position: number, trackWidth: number) {
    this._currentValue = Math.round((position*(this._end - this._start))/trackWidth);
    this.callCommand(position, this._currentValue);
    return this;
  }
  callCommand(position: number, value: number) {
    this._modelChanged.notify({newPos: position, newValue: value})
  }
}

class Presenter {
  private _model: any
  private _view: any
  constructor(model: any, view: any) {
    this._model = model
    this._view = view
    let _presenter = this
    this._view._inputChanged.attach(function (sender: any, args: any) {
      _presenter.callModel(args.position, args.trackWidth)
    })
    this._model._modelChanged.attach(function(sender: any, args: any) {
      _presenter._view.moveThumb(args.newPos)
      _presenter._view.changeTitle(args.newValue)
    })
  }
  init(elem: HTMLLIElement) {
    this._view.createSlider(elem)
  }
  callModel(position: number, trackWidth: number) {
    this._model.valueCalculation(position, trackWidth)
  }
}

(function( $ ) {
  $.fn.perfectSlider = function() {
    this.each(function() {
      let model = new Model(),
        view = new View(),
        presenter = new Presenter(model, view);
      
    presenter.init(this);
    })
    
  };
})(jQuery);

$('.perfectSlider').perfectSlider();




