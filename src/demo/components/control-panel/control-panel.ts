import Slider from '../slider/slider';
import Checkbox from '../checkbox/checkbox';
import TextField from '../text-field/text-field';

export default class ControlPanel {
  public $controlPanel: JQuery<Object>;
  public slider: Slider;
  public $checkboxes: JQuery<Object>;
  public checkboxes: Checkbox[] = [];
  public $textFields: JQuery<Object>;
  public textFields: TextField[] = []

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
  }

  init($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');
    this.initCheckboxes();
    this.initTextFields();
  }

  initCheckboxes() {
    this.$checkboxes = this.$controlPanel.find('.js-control-panel__checkbox');
    this.$checkboxes.each((index, element) => {
      this.checkboxes.push(new Checkbox($(element), this.slider));
    });
  }

  initTextFields() {
    this.$textFields = this.$controlPanel.find('.js-control-panel__text-field');
    this.$textFields.each((index, element) => {
      this.textFields.push(new TextField($(element), this.slider));
    });

    this.textFields.forEach((el) => {
      el.textFieldChanged.attach(() => this.updateValues());
    });
  }

  updateValues() {
    this.textFields.forEach((el) => el.updateValue());
  }
}