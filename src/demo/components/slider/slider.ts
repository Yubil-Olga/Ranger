import '../../../app/app';
import IOptions from '../../../app/IOptions';
import Facade from '../../../app/Presenter/Facade';

export default class Slider {
  public $slider: JQuery<Object>
  public facade: Facade;
  public settings: IOptions

  constructor($container: JQuery<Object>, settings: IOptions) {
    this.findHTMLElement($container);
    this.init(settings);
  }

  findHTMLElement($container: JQuery<Object>) {
    this.$slider = $container.find('.js-slider');
  }

  init(settings?: IOptions) {
    this.$slider.perfectSlider(settings);
    this.settings = this.$slider.perfectSlider('getOptions').get(0);
  }

  getPropertyValue(name: string) {
    return this.$slider.perfectSlider('getOptions').get(0)[name];
  }

  setPropertyValue(name: string, value: string | number | boolean |string[] ) {
    this.settings[name] = value;
    this.$slider.perfectSlider('setOptions', this.settings);
  }
}
