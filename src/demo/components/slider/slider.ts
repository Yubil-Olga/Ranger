import '../../../app/app';
import IOptions from '../../../app/IOptions';
import Facade from '../../../app/Presenter/Facade';

export default class Slider {
  public $slider: JQuery<Object>
  public facade: Facade
  public settings: IOptions

  constructor($container: JQuery<Object>, settings: IOptions) {
    this.findHTMLElement($container);
    this.init(settings);
  }

  findHTMLElement($container: JQuery<Object>) {
    this.$slider = $container.find('.js-slider');
  }

  init(settings?: IOptions) {
    this.facade = this.$slider.perfectSlider(settings)[0];
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
