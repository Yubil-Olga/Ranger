import ValueSliderOptions from './ValueSliderOptions';
import NumberSliderOptions from './NumberSliderOptions';
import IOptions from '../../IOptions';

export default class CreateOptions {
  static create(options: IOptions) {
    let values = [];
    if (Array.isArray(options.values)) {
      values = options.values.filter((el:any) => typeof el === 'string');
    }
    if (values.length > 1) {
      return new ValueSliderOptions(values, options);
    }
    else {
      return new NumberSliderOptions(options);
    }
  }
}
