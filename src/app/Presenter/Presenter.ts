import Model from '../Model/Model';
import View from '../View/View';
import Data from '../Data/Data';
import IUserInput from '../View/IUserInput';

export default class Presenter {
  private _model: Model
  private _view: View

  constructor(model: Model, view: View) {
    this._model = model;
    this._view = view;
    this.initPresenter();
  }

  initPresenter() {
    const _presenter = this;
    this._view.inputChanged.attach(function (sender: View, args: IUserInput) {
      _presenter.callModel(args.position, args.trackWidth, args.index);
    });
    this._model.modelChanged.attach(function(sender: Model, args: Array<Data>) {
      _presenter._view.slider.update(args);
    });
  }

  callModel(position: number, trackWidth: number, index: number): void {
    this._model.valueCalculation(position, trackWidth, index);
  }
}
