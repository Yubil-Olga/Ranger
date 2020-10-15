import EventDispatcher from '../EventDispatcher/EventDispatcher';
import Data from './Data/Data';
import CreateOptions from './Options/CreateOptions';
import IOptions from '../IOptions';

export default class Model {
  private options: IOptions;
  public data: Array<Data>;
  public modelChanged = new EventDispatcher(this);
  public optionsChanged = new EventDispatcher(this);

  constructor(settings: IOptions) {
    this.createOptions(settings);
  }

  public createOptions(options: IOptions) {
    this.options = CreateOptions.create(options);
  }

  public updateOptions(options: IOptions) {
    this.createOptions(options);
    this.optionsChanged.notify(this.options);
    this.init();
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public init(): void {
    this.data = this.initData(this.options.isRange);
    this.callCommand(this.data);
  }

  private initData(isRange: boolean): Array<Data> {
    const arr = [];
    const length = isRange ? 2 : 1;
    for (let i=0; i<length; i++) {
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
