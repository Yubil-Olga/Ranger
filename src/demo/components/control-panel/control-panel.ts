import bind from 'bind-decorator';
import Slider from '../slider/slider';
import Checkbox from '../checkbox/checkbox';
import TextField from '../text-field/text-field';

export default class ControlPanel {
  public $controlPanel: JQuery<Object>;
  public slider: Slider;
  public $checkboxes: JQuery<Object>;
  public checkboxes: Checkbox[] = [];
  public $textFields: JQuery<Object>;
  public textFields: {[name: string]: TextField} ={};

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
    this.bindEventListeners();
  }

  init($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');
    this.initCheckboxes();
    this.initTextFields();
  }

  bindEventListeners() {
    this.slider.$slider.on('changeHandle', this.handleSliderChangeHandle);
  }

  @bind
  handleSliderChangeHandle() {
    if (this.textFields.from && this.textFields.to) {
      this.textFields.from.updateValue();
      this.textFields.to.updateValue();
    }
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
      const textField = new TextField($(element), this.slider);
      this.textFields[textField.name] = textField;
      this.textFields[textField.name].updateValue();
      this.textFields[textField.name].textFieldChanged.attach((field: TextField) => {
        const isToUpdate = !this.slider.getPropertyValue('isRange')
          || this.textFields['from'].getValue() !== this.textFields['to'].getValue();

        if (isToUpdate) {
          this.slider.setPropertyValue(field.name, field.getValue());
        }
        this.updateFields();
      });
    });
  }

  updateFields() {
    Object.values(this.textFields).forEach((field) => field.updateValue());
  }
}