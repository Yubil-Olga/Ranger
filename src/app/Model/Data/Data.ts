import IOptions from '../../IOptions';

export default class Data {
  public value: string
  public positionInPercents: number
  public index: number

  constructor(i: number, options: IOptions) {
    this.index = i;
    this.init(options);
  }

  private init(options: IOptions) {
    if (options.values) {
      this.value = options.values[this.index].toString(),
      this.positionInPercents = this.index*100/(options.values.length - 1);
    }
    else {
      const step = this.calculateStep({step: options.step, start: options.start, end: options.end});
      this.value = (options.start + this.index*step).toString(),
      this.positionInPercents = this.index*step*100/(options.end - options.start);
    }
  }

  private calculateStep(data: {step: number, start: number, end: number}): number {
    const {step, start, end } = data;
    if (step*100/ (end - start) > 10 ) {
      return step;
    }
    else {
      return (end - start)/2;
    }
  }

  public update(value: string, positionInPercents: number): void {
    this.value = value;
    this.positionInPercents = positionInPercents;
  }
}
