import EventDispatcher from '../EventDispatcher/EventDispatcher';
import Data from './Data/Data';
import IOptions from './Options/IOptions';
import IUserSettings from '../IUserSettings';
import CreateOptions from './Options/CreateOptions';

export default class Model {
  private options: IOptions;
  private data: Array<Data>;
  public modelChanged = new EventDispatcher(this);
  public optionsChanged = new EventDispatcher(this);

  constructor(settings: IUserSettings) {
    this.createOptions(settings);
  }

  public createOptions(settings: IUserSettings) {
    this.options = CreateOptions.create(settings);
  }

  public updateOptions(settings: IUserSettings) {
    this.createOptions(settings);
    this.optionsChanged.notify(this.options);
    this.init();
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public init(): void {
    this.data = this.initData(this.options.type);
    this.callCommand(this.data);
  }

  private initData(type: number): Array<Data> {
    const arr = [];
    for (let i=0; i<type; i++) {
      const data = new Data(i, this.options);
      arr.push(data);
    }
    return arr;
  }

  public stepCalculation(): number {
    const step = (this.options.step/(this.options.end - this.options.start))*100;
    return step;
  }

  public positionCalculation(position: number, step: number, trackWidth:number): number {
    const percent = (position/trackWidth)*100;
    let pos: number;
    if ((percent + step) > 100) {
      pos = 100;
    }
    else {
      pos = Math.round(percent/step)*step;
    }
    return pos;
  }

  public valueCalculation(position: number, trackWidth: number, index: number): Array<Data> {
    if (this.options.values) {
      const step = 100/(this.options.values.length - 1);
      const pos = this.positionCalculation(position, step, trackWidth);
      this.data[index].update(this.options.values[pos/step], pos);
    } else {
      const step = this.stepCalculation();
      const pos = this.positionCalculation(position, step, trackWidth);
      const newValue = Math.round(pos*(this.options.end - this.options.start)/100 + this.options.start);
      this.data[index].update(newValue.toString(), pos);
    }
    this.callCommand(this.data);
    return this.data;
  }

  public callCommand(data: Array<Data>): void {
    this.modelChanged.notify(data);
  }
}