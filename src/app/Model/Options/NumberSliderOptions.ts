import Options from './Options';
import { IOptions } from '../../IOptions';

export default class NumberSliderOptions extends Options {
  public start: number
  public end: number
  public step: number
  public scaleStep: number
  public from: number | string
  public to: number | string

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
    this.from = this.isRange ? this.getFromValue(options.from) : null;
    this.to = this.getToValue(options.to);
  }

  getFromValue(from: number | string) {
    const isFromValueValid = typeof from === 'number'
      && Number(from) >= this.start
      && Number(from) < this.end
      && Number(from) % this.step === 0;
    const fromValue = isFromValueValid ? from : this.start;

    return fromValue;
  }

  getToValue(to: string | number) {
    let toValue: number;

    if (this.isRange) {
      const isToValueValid = typeof to === 'number'
        && to <= this.end
        && Number(to) > this.from
        && Number(to) % this.step === 0;
      toValue = isToValueValid ? Number(to) : Number(this.from) + this.step;
    } else {
      const isToValueValid = typeof to === 'number'
        && Number(to) > this.start
        && Number(to) < this.end
        && Number(to) % this.step === 0;
      toValue = isToValueValid ? Number(to) : this.start;
    }

    return toValue;
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
