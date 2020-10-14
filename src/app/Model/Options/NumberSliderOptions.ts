import Options from './Options';
import IUserSettings from '../../IUserSettings';

export default class NumberSliderOptions extends Options {
  public start: number
  public end: number
  public step: number
  public scaleStep: number

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
    this.scaleStep = this.checkScaleStep(options);
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

  checkScaleStep(options: IUserSettings) {
    if (this.scalestepSettingsValid(options)) {
      return options.scaleStep;
    }
    return (this.end - this.start);
  }

  scalestepSettingsValid(options: IUserSettings) {
    return (typeof options.scaleStep === 'number' && options.scaleStep > 1 && options.scaleStep < (this.end - this.start));
  }
}