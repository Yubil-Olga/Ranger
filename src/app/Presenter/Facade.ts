import Model  from '../Model/Model';
import Presenter from '../Presenter/Presenter';
import IUserSettings from '../IUserSettings';

export default class Facade {
  private model: Model
  private presenter: Presenter
  private container: HTMLElement

  constructor(options: IUserSettings, container: HTMLElement) {
    this.container = container;
    this.init(options);
  }

  private init(options: IUserSettings) {
    this.model = new Model(options);
    this.presenter = new Presenter(this.container, this.model);
    this.model.init();
  }

  public updateOptions(options: IUserSettings) {
    this.model.updateOptions(options);
  }

  public getOptions() {
    return this.model.getOptions();
  }
}