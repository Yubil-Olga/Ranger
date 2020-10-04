import IUserSettings from '../IUserSettings';
import IOptions from './IOptions';

export default class Options implements IOptions  {
  public type: number
  public direction: string
  public prefix: string
  public color: string
  public hasTagmark: boolean

  constructor(options: IUserSettings) {
    this.init(options);
  }

  init(options: IUserSettings): void {
    this.type = options.type === 'double' ? 2 : 1;
    this.direction = options.direction === 'vertical' ? 'vertical' : null;
    this.prefix = typeof options.prefix === 'string' ? options.prefix : null;
    this.color = typeof options.color === 'string' ? this.colorValidation(options.color) : null;
    this.hasTagmark = options.hasTagmark === false ? false : true;
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
