import IUserSettings from '../IUserSettings';
import { ValueSliderOptions, NumberSliderOptions, } from './Options';

export default class CreateOptions {
  private _settings: IUserSettings

  constructor(settings: IUserSettings) {
    this._settings = settings;
  }

  create() {
    let values = [];
    if (Array.isArray(this._settings.values)) {
      values = this._settings.values.filter((el:any) => typeof el === 'string');
    }
    if (values.length > 1) {
      return new ValueSliderOptions(values, this._settings);
    }
    else {
      return new NumberSliderOptions(this._settings);
    }
  }
}