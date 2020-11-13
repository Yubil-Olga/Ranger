import { IOptions } from '../../IOptions';

export default class Data {
  public value: string
  public positionInPercents: number
  public index: number

  constructor(i: number, options: IOptions, value?: number | string) {
    this.index = i;
    this.init(options, value);
  }

  private init(options: IOptions, value: string | number) {
    if (options.values) {
      this.value = <string>value;
      this.positionInPercents = options.values.indexOf(<string>value)/(options.values.length - 1) * 100;
    }
    else {
      this.value = value.toString();
      this.positionInPercents = (<number>value - options.start)/(options.end - options.start) * 100;
    }
  }

  public update(value: string, positionInPercents: number): void {
    this.value = value;
    this.positionInPercents = positionInPercents;
  }
}
