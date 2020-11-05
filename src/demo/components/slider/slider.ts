import '../../../app/app';
import IOptions from '../../../app/IOptions';

export default class Slider {
  public $slider: JQuery<Object>

  constructor($container: JQuery<Object>, settings: IOptions) {
    this.findHTMLElement($container);
    this.init(settings);
  }

  findHTMLElement($container: JQuery<Object>) {
    this.$slider = $container.find('.js-slider');
  }

  init(settings?: IOptions) {
    this.$slider.perfectSlider(settings);
  }

  getPropertyValue(name: string) {
    return this.$slider.perfectSlider('getOptions').get(0)[name];
  }

  setPropertyValue(name: string, value: string | number | boolean |string[] ) {
    const settings = this.$slider.perfectSlider('getOptions').get(0);
    settings[name] = value;
    this.$slider.perfectSlider('setOptions', settings);
  }
}
