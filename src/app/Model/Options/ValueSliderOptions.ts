import Options from './Options';
import { IOptions } from '../../IOptions';

export default class ValueSliderOptions extends Options {
  public values: Array<string>
  public from: string
  public to: string

  constructor(values: Array<string>, options: IOptions) {
    super(options);
    this.values = values;
    this.from = this.isRange ? this.getFromValue(options.from) : null;
    this.to = this.getToValue(options.to);
  }

  getFromValue(from: string | number) {
    const isFromValueValid = typeof from === 'string'
      && this.values.includes(from)
      && this.values.indexOf(from) < this.values.length -1;

    return isFromValueValid && typeof from === 'string' ? from : this.values[0];
  }

  getToValue(to: string | number) {
    if (this.isRange) {
      const isToValueValid = typeof to === 'string' && this.values.indexOf(to) > this.values.indexOf(this.from);
      return isToValueValid && typeof to === 'string'
        ? to
        : this.values[this.values.indexOf(this.from) + 1];
    } else {
      const isToValueValid = typeof to === 'string' && this.values.includes(to);
      return isToValueValid && typeof to === 'string'
        ? to
        : this.values[1];
    }
  }
}
