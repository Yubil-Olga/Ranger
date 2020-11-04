import bind from 'bind-decorator';
import Range from '../slider/slider';

export default class Checkbox {
  public $checkbox: JQuery<Object>;
  public name: string
  public range: Range;

  constructor($container: JQuery<Object>, range: Range) {
    this.range = range;
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
    const newValue = this.range.getPropertyValue(this.name);
    this.$checkbox.prop('checked', newValue);
  }

  bindEventListeners() {
    this.$checkbox.on('change', this.handleCheckboxChange);
  }

  @bind
  handleCheckboxChange() {
    this.range.setPropertyValue(this.name, this.isChecked());
  }
}