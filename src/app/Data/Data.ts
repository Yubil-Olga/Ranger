import IOptions from '../Options/IOptions';

export default class Data {
  private _index: number
  private _value: string
  private _coord: number
  private _options: IOptions

  constructor(i: number, options: IOptions) {
    this._index = i;
    this._options = options;
    this.init();
  }

  init() {
    if (this._options.values) {
      this._value = this._options.values[this._index].toString(),
      this._coord = this._index*100/(this._options.values.length - 1);
    }
    else {
      const step = this.calculateStep();
      this._value = (this._options.start + this._index*step).toString(),
      this._coord = this._index*step*100/(this._options.end - this._options.start);
    }
  }

  get value(): string {
    return this._value;
  }

  get coord(): number {
    return this._coord;
  }

  calculateStep(): number {
    if (this._options.step*100/ (this._options.end - this._options.start) > 10 ) {
      return this._options.step;
    }
    else {
      return (this._options.end - this._options.start)/2;
    }
  }

  update(value: string, coord: number): void {
    this._value = value;
    this._coord = coord;
  }
}