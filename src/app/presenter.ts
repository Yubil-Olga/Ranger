import Model from './model'
import View from './view'
import Data from './data'

export default class Presenter {
    private _model: Model
    private _view: View
    constructor(model: Model, view: View) {
      this._model = model
      this._view = view
      let _presenter = this
      this._view.inputChanged.attach(function (sender: View, args: IUserInput) {
        _presenter.callModel(args.position, args.trackWidth, args.index)
      })
      this._model.modelChanged.attach(function(sender: Model, args: Array<Data>) {
        _presenter._view.slider.update(args)
      })
    }
    callModel(position: number, trackWidth: number, index: number) {
      this._model.valueCalculation(position, trackWidth, index)
    }
  }

  interface IUserInput {
    trackWidth: number
    position: number
    index: number
  }