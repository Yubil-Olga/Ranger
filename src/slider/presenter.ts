import './model'
import './view'
import eventDistapcher from './dispatcher'

export default class Presenter {
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
    init(elem: HTMLLIElement, options: any) {
      let params = this.checkOptions(options)
      this._view.createSlider(elem, params)
      this._model.init(params)
    }
    checkOptions(options: any) {
      if (typeof options.start !== 'number' || options.start > options.end) {
        options.start = 0
      }
      if (typeof options.end !== 'number' || options.end < options.start) {
        options.end = 100
      }
      if (typeof options.step !== 'number'|| options.step < 1 || (options.end - options.start)%options.step > 0) {
        options.step = 1
      }
      if (typeof options.to !== 'number' || options.to > options.end || options.to < options.start) {
        options.to = options.start
      }
      
      return options
    }
    callModel(position: number, trackWidth: number) {
      this._model.valueCalculation(position, trackWidth)
    }
  }