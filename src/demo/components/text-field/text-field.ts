import bind from 'bind-decorator';
import Slider from '../slider/slider';
import EventDispatcher from '../../../app/EventDispatcher/EventDispatcher';

export default class TextField {
  public $textField: JQuery<Object>;
  public name: string
  public slider: Slider;
  public textFieldChanged = new EventDispatcher(this)

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
    this.bindEventListeners();
  }

  getValue(): string | number | string[] {
    const inputType = this.$textField.attr('type');
    const value = this.$textField.val();

    const values = {
      'number': Number(value),
      'text': value,
      'textarea': value.toString().split(',').filter((el) => el.length > 0)
    };

    return values[inputType];
  }

  updateValue() {
    const newValue = this.slider.getPropertyValue(this.name);
    this.$textField.val(newValue);
    this.updateStyle(newValue);
  }

  updateStyle(newValue: string) {
    if (newValue === undefined) {
      this.$textField.addClass('text-field__input_disabled');
    } else {
      this.$textField.removeClass('text-field__input_disabled');
    }
  }

  init($container: JQuery<Object>) {
    this.$textField = $container.find('.js-text-field__input');
    this.name = this.$textField.prop('name');
    this.updateValue();
  }

  bindEventListeners() {
    this.$textField.on('change', this.handleInputChange);
  }

  @bind
  handleInputChange() {
    this.slider.setPropertyValue(this.name, this.getValue());
    this.textFieldChanged.notify(this);
  }
}