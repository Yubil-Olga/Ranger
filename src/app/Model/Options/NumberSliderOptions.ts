import Options from './Options';
import { IOptions } from '../../IOptions';

export default class NumberSliderOptions extends Options {
  public start: number
  public end: number
  public step: number
  public scaleStep: number
  public from: number
  public to: number

  constructor(options: IOptions) {
    super(options);

    this.start = this.isUserSettingsValid(options) ? options.start : this.defaultOptions.start;
    this.end = this.isUserSettingsValid(options) ? options.end : this.defaultOptions.end;
    this.step = this.isStepValid(options) ? options.step : this.defaultOptions.step;
    this.scaleStep = this.getScaleStep(options);
    this.from = this.isRange ? this.getFromValue(options) : null;
    this.to = this.getToValue(options);
  }

  getFromValue(options: IOptions) {
    if (typeof options.from === 'number') {
      const isFromValueValid = options.from >= this.start
      && options.from < this.end
      && options.from % this.step === 0;

      return isFromValueValid ? options.from : this.start;
    } else {
      return this.start;
    }
  }

  getToValue(options: IOptions) {
    if (this.isRange) {
      const isToValueValid = typeof options.to === 'number'
        && options.to <= this.end
        && options.to > this.from
        && options.to % this.step === 0;

      return isToValueValid && typeof options.to === 'number' ? options.to : this.from + this.step;
    } else {
      const isToValueValid = typeof options.to === 'number'
        && options.to > this.start
        && options.to < this.end
        && options.to % this.step === 0;

      return isToValueValid && typeof options.to === 'number' ? options.to : this.start;
    }
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
