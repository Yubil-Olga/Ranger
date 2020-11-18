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
    this.from = this.isRange ? this.getFromValue(options.from) : null;
    this.to = this.getToValue(options.to);
  }

  getFromValue(from: number | string) {
    const isFromValueValid = from !== ''
      && from !== null
      && Number(from) >= this.start
      && Number(from) < this.end
      && Number(from) % this.step === 0;

    return isFromValueValid ? Number(from) : this.start;
  }

  getToValue(to: number | string) {
    if (this.isRange) {
      const isToValueValid = to !== ''
        && Number(to) <= this.end
        && Number(to) > this.from
        && Number(to) % this.step === 0;
      return isToValueValid ? Number(to) : Number(this.from) + this.step;
    } else {
      const isToValueValid = to !== ''
        && Number(to) > this.start
        && Number(to) < this.end
        && Number(to) % this.step === 0;
      return isToValueValid ? Number(to) : this.start;
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
