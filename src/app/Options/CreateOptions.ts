import IUserSettings from '../IUserSettings';
import ValueSliderOptions from './ValueSliderOptions';
import NumberSliderOptions from './NumberSliderOptions';

export default class CreateOptions {
  static create(settings: IUserSettings) {
    let values = [];
    if (Array.isArray(settings.values)) {
      values = settings.values.filter((el:any) => typeof el === 'string');
    }
    if (values.length > 1) {
      return new ValueSliderOptions(values, settings);
    }
    else {
      return new NumberSliderOptions(settings);
    }
  }
}