import bind from 'bind-decorator';

import Slider from '../slider/Slider';
import Checkbox from '../checkbox/Checkbox';
import TextField from '../text-field/TextField';

class ControlPanel {
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

  private init($container: JQuery<Object>) {
    this.$controlPanel = $container.find('.js-control-panel');
    this.initCheckboxes();
    this.initTextFields();
  }

  private bindEventListeners() {
    this.slider.$slider.on('changeHandle', this.handleSliderChangeHandle);
  }

  @bind
  private handleSliderChangeHandle() {
    if (this.textFields.from && this.textFields.to) {
      this.textFields.from.updateValue();
      this.textFields.to.updateValue();
    }
  }

  private initCheckboxes() {
    this.$checkboxes = this.$controlPanel.find('.js-control-panel__checkbox');
    this.$checkboxes.each((_, element) => {
      this.checkboxes.push(new Checkbox($(element), this.slider));
    });
  }

  private initTextFields() {
    this.$textFields = this.$controlPanel.find('.js-control-panel__text-field');
    this.$textFields.each((_, element) => {
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

  private updateFields() {
    Object.values(this.textFields).forEach((field) => field.updateValue());
  }
}

export default ControlPanel;