import Model  from '../Model/Model';
import Presenter from '../Presenter/Presenter';
import { IOptions } from '../IOptions';

class Facade {
  private model: Model
  private presenter: Presenter
  private container: HTMLElement

  constructor(options: IOptions, container: HTMLElement) {
    this.container = container;
    this.init(options);
  }

  public setOptions(options: IOptions) {
    this.model.updateOptions(options);
  }

  public getOptions() {
    return this.model.getOptions();
  }

  public subscribe(fn: Function) {
    this.model.onChange.attach(fn);
  }

  public unsubscribe(fn: Function) {
    this.model.onChange.unsubscribe(fn);
  }

  private init(options: IOptions) {
    this.model = new Model(options);
    this.presenter = new Presenter(this.container, this.model);
    this.model.init();
  }
}

export default Facade;