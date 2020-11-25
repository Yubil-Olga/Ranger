import Options from './Options';
import { IOptions } from '../../IOptions';

export default class ValueSliderOptions extends Options {
  public values: Array<string>
  public from: string
  public to: string

  constructor(values: Array<string>, options: IOptions) {
    super(options);
    this.values = values;
    this.from = this.isRange ? this.getFromValue(options) : null;
    this.to = this.getToValue(options);
  }

  getFromValue(options: IOptions) {
    const isFromValueValid = typeof options.from === 'string'
      && this.values.includes(options.from)
      && this.values.indexOf(options.from) < this.values.length -1;

    return isFromValueValid && typeof options.from === 'string' ? options.from : this.values[0];
  }

  getToValue(options: IOptions) {
    if (this.isRange) {
      const isToValueValid = typeof options.to === 'string' && this.values.indexOf(options.to) > this.values.indexOf(this.from);
      return isToValueValid && typeof options.to === 'string'
        ? options.to
        : this.values[this.values.indexOf(this.from) + 1];
    } else {
      const isToValueValid = typeof options.to === 'string' && this.values.includes(options.to);
      return isToValueValid && typeof options.to === 'string'
        ? options.to
        : this.values[1];
    }
  }
}
