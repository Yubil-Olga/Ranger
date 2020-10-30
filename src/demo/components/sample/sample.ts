import Range from '../range/range';
import ControlPanel from '../control-panel/control-panel';
import IOptions from '../../../app/IOptions';

export default class Sample {
  public $sample: JQuery<Object>;
  public settings: IOptions;
  public range: Range;
  public controlPanel: ControlPanel;

  constructor($container: JQuery<Object>, settings?: IOptions) {
    this.settings = settings;
    this.findHTMLElement($container);
    this.initSlider();
  }

  findHTMLElement($container: JQuery<Object>) {
    this.$sample = $container.find('.js-sample');
  }

  initSlider() {
    this.range = new Range(this.$sample, this.settings);
    this.controlPanel = new ControlPanel(this.$sample, this.range);
  }
}