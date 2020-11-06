import Options from './Options';
import { IOptions } from '../../IOptions';

export default class ValueSliderOptions extends Options {
  public values: Array<string>

  constructor(values: Array<string>, options: IOptions) {
    super(options);
    this.values = values;
  }
}
