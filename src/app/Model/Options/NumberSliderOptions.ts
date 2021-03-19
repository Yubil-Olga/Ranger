import Decimal from 'decimal.js-light';

import { IOptions } from '../../IOptions';
import Options from './Options';

class NumberSliderOptions extends Options {
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

  public getFromValue(from: number | string) {
    if (typeof from === 'number') {
      const isFromValueValid = from >= this.start
      && from < this.end
      && new Decimal(from - this.start).modulo(this.step).isZero();
      return isFromValueValid ? from : this.start;
    } else {
      return this.start;
    }
  }

  public getToValue(to: number | string) {
    if (typeof to === 'number') {
      if (this.isToValueValid(to)) return to;
      if (to >= this.end) return this.end;
    }
    return this.isRange ? this.from + this.step : this.start;
  }

  public getScaleStep(scaleStep: number) {
    if (this.isScaleStepValid(scaleStep)) {
      return scaleStep % this.step === 0 ? scaleStep : this.step;
    }
    return (this.end - this.start);
  }

  private isToValueValid(to: number) {
    if (this.isRange) {
      return (
        to <= this.end
        && to > this.from
        && new Decimal(to - this.start).modulo(this.step).isZero()
      );
    } else {
      return (to <= this.end && to > this.start && (to - this.start) % this.step === 0);
    }
  }

  private isUserSettingsValid(options: IOptions) {
    const {start, end} = options;
    return (typeof start === 'number' && typeof end === 'number' && start < end);
  }

  private isStepValid(options: IOptions) {
    const {start, end, step} = options;
    return (typeof step === 'number' && step > 0 && step <= Math.abs(end - start));
  }

  private isScaleStepValid(scaleStep: number) {
    return (typeof scaleStep === 'number' && scaleStep > 0 && scaleStep < (this.end - this.start));
  }
}

export default NumberSliderOptions;