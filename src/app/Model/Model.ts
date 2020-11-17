import EventDispatcher from '../EventDispatcher/EventDispatcher';
import Data from './Data/Data';
import { IOptions } from '../IOptions';
import ValueSliderOptions from './Options/ValueSliderOptions';
import NumberSliderOptions from './Options/NumberSliderOptions';

export default class Model {
  private options: IOptions;
  public data: Array<Data>;
  public modelChanged = new EventDispatcher();
  public optionsChanged = new EventDispatcher();

  constructor(settings: IOptions) {
    this.createOptions(settings);
  }

  public createOptions(options: IOptions) {
    const values = Array.isArray(options.values) ? options.values : [];
    this.options = values.length > 1
      ? new ValueSliderOptions(values, options)
      : new NumberSliderOptions(options);
  }

  public updateOptions(options: IOptions) {
    this.createOptions(options);
    this.optionsChanged.notify(this.options);
    this.init();
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public getData() {
    return this.data;
  }

  public init(): void {
    this.initData();
    this.data.forEach((el) => this.modelChanged.notify(el));
  }

  initData() {
    this.data = this.options.isRange
      ? [new Data(0, this.options, this.options.from), new Data(1, this.options, this.options.to)]
      : [new Data(0, this.options, this.options.to)];
  }

  public stepCalculation(): number {
    const step = (this.options.step / (this.options.end - this.options.start)) * 100;
    return step;
  }

  public positionCalculation(data: {positionInPercents: number, step: number}): number {
    const { positionInPercents, step } = data;
    const newPosition = Math.round(positionInPercents / step) * step;
    return newPosition;
  }

  public updateModel(data: {positionInPercents: number, index: number}): Array<Data> {
    const { positionInPercents, index } = data;

    let step: number;
    let newPositionInPercents: number;
    let newValue: string;

    if (this.options.values) {
      step = 100 / (this.options.values.length - 1);
      newPositionInPercents = this.positionCalculation({ positionInPercents, step });
      newValue = this.options.values[newPositionInPercents / step];
    } else {
      step = this.stepCalculation();
      newPositionInPercents = this.positionCalculation({ positionInPercents, step });
      newValue = Math.round(newPositionInPercents * (this.options.end - this.options.start) /100 + this.options.start).toString();
    }

    this.data[index].update(newValue, newPositionInPercents);
    this.updateValues(index, newValue);

    this.modelChanged.notify(this.data[index]);
    return this.data;
  }

  public updateValues(index: number, value: string | number) {
    const attributes = this.options.isRange ? ['from', 'to'] : ['to'];
    this.options[attributes[index]] = value;
  }
}
