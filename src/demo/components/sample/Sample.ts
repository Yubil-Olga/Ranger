import { IOptions } from '../../../app/IOptions';
import Slider from '../slider/Slider';
import ControlPanel from '../control-panel/ControlPanel';

class Sample {
  public $sample: JQuery<Object>;
  public settings: IOptions;
  public slider: Slider;
  public controlPanel: ControlPanel;

  constructor($container: JQuery<Object>, settings?: IOptions) {
    this.settings = settings;
    this.findHTMLElement($container);
    this.initSlider();
  }

  private findHTMLElement($container: JQuery<Object>) {
    this.$sample = $container.find('.js-sample');
  }

  private initSlider() {
    this.slider = new Slider(this.$sample, this.settings);
    this.controlPanel = new ControlPanel(this.$sample, this.slider);
  }
}

export default Sample;