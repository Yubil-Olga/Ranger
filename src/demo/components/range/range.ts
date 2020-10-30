import '../../../app/app';
import IOptions from '../../../app/IOptions';
import Facade from '../../../app/Presenter/Facade';

export default class Range {
  public $range: JQuery<Object>
  public facade: Facade
  public settings: IOptions

  constructor($container: JQuery<Object>, settings: IOptions) {
    this.findHTMLElement($container);
    this.init(settings);
  }

  findHTMLElement($container: JQuery<Object>) {
    this.$range = $container.find('.js-range');
  }

  init(settings?: IOptions) {
    this.facade = this.$range.perfectSlider(settings)[0];
    this.settings = this.facade.getOptions();
  }

  getPropertyValue(name: string) {
    return this.facade.getOptions()[name];
  }

  setPropertyValue(name: string, value: string | number | boolean |string[] ) {
    this.settings[name] = value;

    this.facade.updateOptions(this.settings);
  }
}
