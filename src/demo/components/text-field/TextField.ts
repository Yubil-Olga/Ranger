import bind from 'bind-decorator';

import EventDispatcher from '../../../app/EventDispatcher/EventDispatcher';
import Slider from '../slider/Slider';

class TextField {
  public $textField: JQuery<Object>;
  public name: string
  public slider: Slider;
  public textFieldChanged = new EventDispatcher();

  constructor($container: JQuery<Object>, slider: Slider) {
    this.slider = slider;
    this.init($container);
    this.bindEventListeners();
  }

  public getValue(): string | number | string[] {
    const inputType = this.$textField.attr('type');
    const value = this.$textField.val();

    const values = {
      'number': Number(value),
      'text': value,
      'textarea': value.toString().split(',').filter((el) => el.length > 0)
    };

    return values[inputType];
  }

  public updateValue() {
    if (this.name === 'from' || this.name === 'to') {
      this.updateType();
    }

    const isDisabled = this.name === 'from' && !this.slider.getPropertyValue('isRange');
    (<HTMLInputElement>this.$textField[0]).disabled = isDisabled;

    const newValue = this.slider.getPropertyValue(this.name);
    this.$textField.val(newValue);
    this.updateStyle(newValue);
  }

  private updateType() {
    if (!this.slider.getPropertyValue('values')) {
      this.$textField.attr('type', 'number');
      this.$textField.attr('step', this.slider.getPropertyValue('step'));
      this.$textField.attr('min', this.slider.getPropertyValue('start'));
    } else {
      this.$textField.attr('type', 'text');
      this.$textField.removeAttr('step');
    }
  }

  private updateStyle(newValue: string) {
    if (newValue === undefined) {
      this.$textField.addClass('text-field__input_disabled');
    } else {
      this.$textField.removeClass('text-field__input_disabled');
    }
  }

  private init($container: JQuery<Object>) {
    this.$textField = $container.find('.js-text-field__input');
    this.name = this.$textField.prop('name');
  }

  private bindEventListeners() {
    this.$textField.on('change', this.handleInputChange);
  }

  @bind
  private handleInputChange() {
    this.textFieldChanged.notify(this);
  }
}

export default TextField;