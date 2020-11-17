import Options from './Options';
import { IOptions } from '../../IOptions';

export default class ValueSliderOptions extends Options {
  public values: Array<string>
  public from: string
  public to: string

  constructor(values: Array<string>, options: IOptions) {
    super(options);
    this.values = values;
    this.from = this.isRange ? this.getFromValue(<string>options.from) : null;
    this.to = this.getToValue(<string>options.to);
  }

  getFromValue(from: string) {
    const isFromValueValid = this.values.includes(from)
      && this.values.indexOf(from) < this.values.length -1;

    const fromValue =  isFromValueValid
      ? from
      : this.values[0];

    return fromValue;
  }

  getToValue(to: string) {
    if (this.isRange) {
      return this.values.indexOf(to) > this.values.indexOf(this.from)
        ? to
        : this.values[this.values.indexOf(this.from) + 1];
    } else {
      return this.values.includes(to)
        ? to
        : this.values[1];
    }
  }
}
