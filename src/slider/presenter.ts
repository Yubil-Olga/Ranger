import './model'
import './view'
import eventDistapcher from './dispatcher'
import Options from './options'

export default class Presenter {
    private _model: any
    private _view: any
    constructor(model: any, view: any) {
      this._model = model
      this._view = view
      let _presenter = this
      this._view._inputChanged.attach(function (sender: any, args: any) {
        _presenter.callModel(args.position, args.trackWidth, args.index)
      })
      this._model._modelChanged.attach(function(sender: any, args: any) {
        _presenter._view.update(args)
      })
    }
    init(elem: HTMLLIElement, options: any) {
      let params = new Options(options).create()
      this._view.createSlider(elem, params)
      this._model.init(params)
    }
    callModel(position: number, trackWidth: number, index: number) {
      this._model.valueCalculation(position, trackWidth, index)
    }
  }