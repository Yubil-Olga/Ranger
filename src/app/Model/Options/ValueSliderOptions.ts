import Options from './Options';
import IUserSettings from '../../IUserSettings';

export default class ValueSliderOptions extends Options{
  public values: Array<string>

  constructor(values: Array<string>, options: IUserSettings) {
    super(options);
    this.values = values;
  }
}