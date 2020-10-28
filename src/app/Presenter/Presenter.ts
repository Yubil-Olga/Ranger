import Model from '../Model/Model';
import View from '../View/View';
import IOptions from '../IOptions';

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
    this.view.inputChanged.attach(function (sender: View, data: {positionInPercents: number, index: number}) {
      presenter.updateModel(data);
    });
    this.model.modelChanged.attach(function(sender: Model, data: {positionInPercents: number, index: number, value: string}) {
      presenter.updateViewData(data);
    });
    this.model.optionsChanged.attach(function(sender: Model, args: IOptions) {
      presenter.updateViewOptions(args);
    });
  }

  public updateModel(data: {positionInPercents: number, index: number}) {
    this.model.updateModel(data);
  }

  public updateViewData(data: {positionInPercents: number, index: number, value: string}): void {
    this.view.update(data);
  }

  public updateViewOptions(args: IOptions): void {
    this.view.updateOptions(args);
  }
}
