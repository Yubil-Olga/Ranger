import Options from './Options';
import IUserSettings from '../IUserSettings';

export default class NumberSliderOptions extends Options {
  public start: number
  public end: number
  public step: number
  public scalestep: number

  constructor(options: IUserSettings) {
    super(options);
    if (this.userSettingsInvalid(options)) {
      this.start = 0;
      this.end = 100;
    } else {
      this.start = options.start;
      this.end = options.end;
    }
    this.step = this.checkStep(options);
    this.scalestep = this.checkScalestep(options);
  }

  userSettingsInvalid(options: IUserSettings) {
    return (typeof options.start !== 'number' || typeof options.end !== 'number' || options.start >= options.end);
  }

  checkStep(options: IUserSettings) {
    if (typeof options.step !== 'number'|| options.step < 1) {
      return 1;
    }
    if (options.step > Math.abs(options.end - options.start)) {
      return Math.abs(this.end - this.start);
    }
    else {
      return options.step;
    }
  }

  checkScalestep(options: IUserSettings) {
    if (this.scalestepSettingsValid(options)) {
      return options.scalestep;
    }
    return (this.end - this.start);
  }

  scalestepSettingsValid(options: IUserSettings) {
    return (typeof options.scalestep === 'number' && options.scalestep > 1 && options.scalestep < (this.end - this.start));
  }
}