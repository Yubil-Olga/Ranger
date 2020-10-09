import IOptions from '../Options/IOptions';

export default class Data {
  public value: string
  public coord: number
  public index: number
  private options: IOptions

  constructor(i: number, options: IOptions) {
    this.index = i;
    this.options = options;
    this.init();
  }

  private init() {
    if (this.options.values) {
      this.value = this.options.values[this.index].toString(),
      this.coord = this.index*100/(this.options.values.length - 1);
    }
    else {
      const step = this.calculateStep();
      this.value = (this.options.start + this.index*step).toString(),
      this.coord = this.index*step*100/(this.options.end - this.options.start);
    }
  }

  private calculateStep(): number {
    if (this.options.step*100/ (this.options.end - this.options.start) > 10 ) {
      return this.options.step;
    }
    else {
      return (this.options.end - this.options.start)/2;
    }
  }

  public update(value: string, coord: number): void {
    this.value = value;
    this.coord = coord;
  }
}