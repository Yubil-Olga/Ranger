import EventDispatcher from '../EventDispatcher/EventDispatcher';
import Data from './Data/Data';
import IOptions from '../Options/IOptions';

export default class Model {
  private _options: IOptions;
  private _data: Array<Data>;
  private _modelChanged = new EventDispatcher(this);

  constructor(options: IOptions) {
    this._options = options;
  }

  get modelChanged(): EventDispatcher {
    return this._modelChanged;
  }

  init(): void {
    this._data = this.initData(this._options.type);
    this.callCommand(this._data);
  }

  initData(type: number): Array<Data> {
    const arr = [];
    for (let i=0; i<type; i++) {
      const data = new Data(i, this._options);
      arr.push(data);
    }
    return arr;
  }

  stepCalculation(): number {
    const step = (this._options.step/(this._options.end - this._options.start))*100;
    return step;
  }

  positionCalculation(position: number, step: number, trackWidth:number): number {
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

  valueCalculation(position: number, trackWidth: number, index: number): Array<Data> {
    if (this._options.values) {
      const step = 100/(this._options.values.length - 1);
      const pos = this.positionCalculation(position, step, trackWidth);
      this._data[index].update(this._options.values[pos/step], pos);
    } else {
      const step = this.stepCalculation();
      const pos = this.positionCalculation(position, step, trackWidth);
      const newValue = Math.round(pos*(this._options.end - this._options.start)/100 + this._options.start);
      this._data[index].update(newValue.toString(), pos);
    }
    this.callCommand(this._data);
    return this._data;
  }

  callCommand(data: Array<Data>): void {
    this._modelChanged.notify(data);
  }
}