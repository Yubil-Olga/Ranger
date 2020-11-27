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
    this.scaleStep = this.getScaleStep(options.scaleStep);
    this.from = this.isRange ? this.getFromValue(options.from) : null;
    this.to = this.getToValue(options.to);
  }

  getFromValue(from: number | string) {
    if (typeof from === 'number') {
      const isFromValueValid = from >= this.start
      && from < this.end
      && (from - this.start) % this.step === 0;

      return isFromValueValid ? from : this.start;
    } else {
      return this.start;
    }
  }

  getToValue(to: number | string) {
    if (this.isRange) {
      const isToValueValid = typeof to === 'number'
        && to <= this.end
        && to > this.from
        && (to - this.start) % this.step === 0;

      return isToValueValid && typeof to === 'number' ? to : this.from + this.step;
    } else {
      const isToValueValid = typeof to === 'number'
        && to > this.start
        && to < this.end
        && (to - this.start) % this.step === 0;

      return isToValueValid && typeof to === 'number' ? to : this.start;
    }
  }

  isUserSettingsValid(options: IOptions) {
    const {start, end} = options;
    return (typeof start === 'number' && typeof end === 'number' && start < end);
  }

  isStepValid(options: IOptions) {
    const {start, end, step} = options;
    return (typeof step === 'number' && step > 1 && step < Math.abs(end - start));
  }

  getScaleStep(scaleStep: number) {
    if (this.isScaleStepValid(scaleStep)) {
      return scaleStep;
    }
    return (this.end - this.start);
  }

  isScaleStepValid(scaleStep: number) {
    return (typeof scaleStep === 'number' && scaleStep > 1 && scaleStep < (this.end - this.start));
  }
}
