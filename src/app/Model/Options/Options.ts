import { IOptions } from '../../IOptions';
import defaultOptions from './defaultOptions';

class Options implements IOptions  {
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

  private init(settings: IOptions): void {
    const {isRange, isVertical, prefix, color, hasTagmark} = settings;

    this.isRange = typeof isRange === 'boolean' ? isRange : this.defaultOptions.isRange;
    this.isVertical = typeof isVertical === 'boolean' ? isVertical : this.defaultOptions.isVertical;
    this.prefix = typeof prefix === 'string' ? prefix : this.defaultOptions.prefix;
    this.color = typeof color === 'string' ? color : this.defaultOptions.color;
    this.hasTagmark = typeof hasTagmark === 'boolean' ? hasTagmark : this.defaultOptions.hasTagmark;
  }
}

export default  Options;