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
      this._view.createSlider(elem)
      console.log(options)
    }
    callModel(position: number, trackWidth: number) {
      this._model.valueCalculation(position, trackWidth)
    }
  }