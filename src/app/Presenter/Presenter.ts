import Model from '../Model/Model';
import View from '../View/View';
import Data from '../Model/Data/Data';
import IUserInput from '../View/IUserInput';
import IOptions from '../Model/Options/IOptions';

export default class Presenter {
  private model: Model
  private view: View

  constructor(element: HTMLElement, model: Model) {
    this.model = model;
    this.init(element);
  }

  private init(element: HTMLElement) {
    this.view = new View(this.model.getOptions(), element);
    const presenter = this;
    this.view.inputChanged.attach(function (sender: View, args: IUserInput) {
      presenter.callModel(args.position, args.trackWidth, args.index);
    });
    this.model.modelChanged.attach(function(sender: Model, args: Array<Data>) {
      presenter.updateViewData(args);
    });
    this.model.optionsChanged.attach(function(sender: Model, args: IOptions) {
      presenter.updateViewOptions(args);
    });
  }

  public updateViewData(args: Array<Data>): void {
    this.view.update(args);
  }

  public updateViewOptions(args: IOptions): void {
    this.view.updateOptions(args);
  }

  public callModel(position: number, trackWidth: number, index: number): void {
    this.model.valueCalculation(position, trackWidth, index);
  }
}
