import '../../../app/app';
import { IOptions } from '../../../app/IOptions';

class Slider {
  public $slider: JQuery<Object>

  constructor($container: JQuery<Object>, settings: IOptions) {
    this.findHTMLElement($container);
    this.init(settings);
  }

  public getPropertyValue(name: string) {
    return this.$slider.perfectSlider('getOptions').get(0)[name];
  }

  public setPropertyValue(name: string, value: string | number | boolean | string[]) {
    this.$slider.perfectSlider('setOptions', {[name]: value});
  }

  private findHTMLElement($container: JQuery<Object>) {
    this.$slider = $container.find('.js-slider');
  }

  private init(settings?: IOptions) {
    this.$slider.perfectSlider(settings);
  }
}

export default Slider;