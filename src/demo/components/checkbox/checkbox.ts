import bind from 'bind-decorator';
import Slider from '../slider/slider';

export default class Checkbox {
  public $checkbox: JQuery<Object>;
  public name: string
  public slider: Slider;

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
    this.bindEventListeners();
  }

  isChecked() {
    return this.$checkbox.prop('checked');
  }

  init($container: JQuery<Object>) {
    this.$checkbox = $container.find('.js-checkbox__input');
    this.name = this.$checkbox.prop('name');
    this.updateValue();
  }

  updateValue() {
    const newValue = this.slider.getPropertyValue(this.name);
    this.$checkbox.prop('checked', newValue);
  }

  bindEventListeners() {
    this.$checkbox.on('change', this.handleCheckboxChange);
  }

  @bind
  handleCheckboxChange() {
    this.slider.setPropertyValue(this.name, this.isChecked());
  }
}