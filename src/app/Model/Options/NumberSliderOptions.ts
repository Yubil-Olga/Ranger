import Options from './Options';
import IOptions from '../../IOptions';

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
      this.start = 0;
      this.end = 100;
    }
    this.step = this.getStep(options);
    this.scaleStep = this.getScaleStep(options);
  }

  isUserSettingsValid(options: IOptions) {
    return (typeof options.start === 'number' && typeof options.end === 'number' && options.start < options.end);
  }

  getStep(options: IOptions) {
    if (this.isStepValid(options)) {
      return options.step;
    } else {
      return 1;
    }
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
