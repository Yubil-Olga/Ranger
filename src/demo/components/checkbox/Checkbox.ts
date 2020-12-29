import bind from 'bind-decorator';

import Slider from '../slider/Slider';

class Checkbox {
  public $checkbox: JQuery<Object>;
  public name: string
  public slider: Slider;

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
    this.bindEventListeners();
  }

  private isChecked() {
    return this.$checkbox.prop('checked');
  }

  private init($container: JQuery<Object>) {
    this.$checkbox = $container.find('.js-checkbox__input');
    this.name = this.$checkbox.prop('name');
    this.updateValue();
  }

  private updateValue() {
    const newValue = this.slider.getPropertyValue(this.name);
    this.$checkbox.prop('checked', newValue);
  }

  private bindEventListeners() {
    this.$checkbox.on('change', this.handleCheckboxChange);
  }

  @bind
  private handleCheckboxChange() {
    this.slider.setPropertyValue(this.name, this.isChecked());
  }
}

export default Checkbox;