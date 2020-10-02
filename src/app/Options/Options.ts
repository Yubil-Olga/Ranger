import IUserSettings from '../IUserSettings';
import IOptions from './IOptions';

class Options implements IOptions  {
  private _type: number
  private _direction: string
  private _prefix: string
  private _color: string
  private _hasTagmark: boolean

  constructor(options: IUserSettings) {
    this.init(options);
  }

  init(options: IUserSettings): void {
    this._type = options.type === 'double' ? 2 : 1;
    this._direction = options.direction === 'vertical' ? 'vertical' : null;
    this._prefix = typeof options.prefix === 'string' ? options.prefix : null;
    this._color = typeof options.color === 'string' ? this.colorValidation(options.color) : null;
    this._hasTagmark = options.hasTagmark === false ? false : true;
  }

  get type(): number {
    return this._type;
  }

  get direction(): string {
    return this._direction;
  }

  get prefix(): string {
    return this._prefix;
  }

  get hasTagmark(): boolean {
    return this._hasTagmark;
  }

  get color(): string {
    return this._color;
  }

  colorValidation(color: string) {
    const div = document.createElement('div');
    div.style.color = color;
    if (div.style.color === '') {
      return null;
    } else {
      return color;
    }
  }
}

class NumberSliderOptions extends Options {
  private _start: number
  private _end: number
  private _step: number
  private _scalestep: number

  constructor(options: IUserSettings) {
    super(options);
    if (this.userSettingsInvalid(options)) {
      this._start = 0;
      this._end = 100;
    } else {
      this._start = options.start;
      this._end = options.end;
    }
    this._step = this.checkStep(options);
    this._scalestep = this.checkScalestep(options);
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get step() {
    return this._step;
  }

  get scalestep() {
    return this._scalestep;
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

class ValueSliderOptions extends Options{
  private _values: Array<string>

  constructor(values: Array<string>, options: IUserSettings) {
    super(options);
    this._values = values;
  }

  get values() {
    return this._values;
  }
}

export {
  ValueSliderOptions,
  NumberSliderOptions
};
