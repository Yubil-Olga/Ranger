import Options from './Options';
import { IOptions } from '../../IOptions';

export default class NumberSliderOptions extends Options {
  public start: number
  public end: number
  public step: number
  public scaleStep: number

  constructor(options: IOptions) {
    super(options);

    if (this.isUserSettingsValid(options)) {
      this.start = options.start;
      this.end = options.end;
    } else {
      this.start = this.defaultOptions.start;
      this.end = this.defaultOptions.end;
    }

    this.step = this.isStepValid(options) ? options.step : this.defaultOptions.step;
    this.scaleStep = this.getScaleStep(options);
  }

  isUserSettingsValid(options: IOptions) {
    return (typeof options.start === 'number' && typeof options.end === 'number' && options.start < options.end);
  }

  isStepValid(options: IOptions) {
    return (typeof options.step === 'number' && options.step > 1 && options.step < Math.abs(options.end - options.start));
  }

  getScaleStep(options: IOptions) {
    if (this.isScaleStepValid(options)) {
      return options.scaleStep;
    }
    return (this.end - this.start);
  }

  isScaleStepValid(options: IOptions) {
    return (typeof options.scaleStep === 'number' && options.scaleStep > 1 && options.scaleStep < (this.end - this.start));
  }
}
