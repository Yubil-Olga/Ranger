import { IOptions } from '../../IOptions';
import defaultOptions from './defaultOptions';

export default class Options implements IOptions  {
  public defaultOptions: IOptions
  public isRange: boolean
  public isVertical: boolean
  public prefix: string
  public color: string
  public hasTagmark: boolean

  constructor(options: IOptions) {
    this.defaultOptions = { ...defaultOptions };
    this.init(options);
  }

  init(settings: IOptions): void {
    this.isRange = typeof settings.isRange === 'boolean' ? settings.isRange : this.defaultOptions.isRange;
    this.isVertical = typeof settings.isVertical === 'boolean' ? settings.isVertical : this.defaultOptions.isVertical;
    this.prefix = typeof settings.prefix === 'string' ? settings.prefix : this.defaultOptions.prefix;
    this.color = typeof settings.color === 'string' ? settings.color : this.defaultOptions.color;
    this.hasTagmark = typeof settings.hasTagmark === 'boolean' ? settings.hasTagmark : this.defaultOptions.hasTagmark;
  }
}
