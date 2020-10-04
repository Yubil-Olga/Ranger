import Model from '../Model/Model';
import View from '../View/View';
import Data from '../Model/Data/Data';
import IUserInput from '../View/IUserInput';

export default class Presenter {
  private model: Model
  private view: View

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.initPresenter();
  }

  private initPresenter() {
    const presenter = this;
    this.view.inputChanged.attach(function (sender: View, args: IUserInput) {
      presenter.callModel(args.position, args.trackWidth, args.index);
    });
    this.model.modelChanged.attach(function(sender: Model, args: Array<Data>) {
      presenter.view.slider.update(args);
    });
  }

  public callModel(position: number, trackWidth: number, index: number): void {
    this.model.valueCalculation(position, trackWidth, index);
  }
}
