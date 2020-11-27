import { IOptions } from '../../IOptions';

export default class Data {
  public value: string | number
  public positionInPercents: number
  public index: number

  constructor(i: number, options: IOptions, value?: number | string) {
    this.index = i;
    this.init(options, value);
  }

  private init(options: IOptions, value: string | number) {
    const {values, start, end} = options;

    this.value = value;
    this.positionInPercents = !values && typeof value === 'number'
      ? (value - options.start)/(end - start) * 100
      : options.values.indexOf(value.toString())/(values.length - 1) * 100;
  }

  public update(value: string | number, positionInPercents: number): void {
    this.value = value;
    this.positionInPercents = positionInPercents;
  }
}
