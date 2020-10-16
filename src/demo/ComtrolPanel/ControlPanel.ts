import bind from 'bind-decorator';
import '../../app/app';
import Facade from '../../app/Presenter/Facade';
import IOptions from '../../app/IOptions';

export default class ControlPanel {
  private facade: Facade
  private options: IOptions
  private controlPanel: HTMLElement
  private colorInput: HTMLInputElement
  private prefixInput: HTMLInputElement
  private rangeInput: HTMLInputElement
  private directionInput: HTMLInputElement
  private startInput: HTMLInputElement
  private endInput: HTMLInputElement
  private stepInput: HTMLInputElement
  private scalestepInput: HTMLInputElement
  private tagmarkInput: HTMLInputElement
  private valueInput: HTMLInputElement

  constructor(facade: Facade) {
    this.facade = facade[0];
    this.init();
  }

  init() {
    this.createHTMLElements();
    this.updateInputValues();
  }

  getElement() {
    return this.controlPanel;
  }

  createHTMLElements() {
    this.controlPanel = document.createElement('div');
    this.controlPanel.classList.add('demo__control-panel');
    this.createRangeInput();
    this.createDirectionInput();
    this.createColorInput();
    this.createPrefixInput();
    this.createMinValueInput();
    this.createMaxValueInput();
    this.createSliderStepInput();
    this.createScaleStepInput();
    this.createTagmarkInput();
    this.createValuesInput();
    this.bindEvents();
  }

  private updateInputValues() {
    this.options = this.facade.getOptions();
    this.colorInput.value = this.options.color || '#53b6a8';
    this.prefixInput.value = this.options.prefix || null;
    this.rangeInput.checked = this.options.isRange;
    this.directionInput.checked = this.options.isVertical;
    this.startInput.value = this.options.start? this.options.start.toString() : null;
    this.endInput.value = this.options.end ? this.options.end.toString() : null;
    this.stepInput.value = this.options.step? this.options.step.toString() : null;
    this.scalestepInput.value = this.options.scaleStep? this.options.scaleStep.toString() : null;
    this.tagmarkInput.checked = this.options.hasTagmark;
    this.valueInput.value = this.options.values? this.options.values.join(',') : null;
  }

  private createColorInput() {
    this.colorInput = this.createInput({ type: 'text', name: 'color', className: 'demo__input' });
    this.createLabel('Color', this.colorInput);
  }

  private createPrefixInput() {
    this.prefixInput = this.createInput({ type: 'text', name: 'prefix', className: 'demo__input' });
    this.createLabel('Prefix', this.prefixInput);
  }

  private createRangeInput() {
    this.rangeInput = this.createInput({ type: 'checkbox', className: 'demo__checkbox' });
    this.createLabel('Is range', this.rangeInput);
  }

  private createDirectionInput() {
    this.directionInput = this.createInput({ type: 'checkbox', className: 'demo__checkbox'});
    this.createLabel('Is vertical', this.directionInput);
  }

  private createMinValueInput() {
    this.startInput = this.createInput({ type: 'number', className: 'demo__input' });
    this.createLabel('Min value', this.startInput);
  }

  private createMaxValueInput() {
    this.endInput = this.createInput({ type: 'number', className: 'demo__input' });
    this.createLabel('Max value', this.endInput);
  }

  private createSliderStepInput() {
    this.stepInput = this.createInput({ type: 'number', className: 'demo__input'});
    this.createLabel('Step of slider', this.stepInput);
  }

  private createScaleStepInput() {
    this.scalestepInput = this.createInput({ type: 'number', className: 'demo__input'});
    this.createLabel('Scale step', this.scalestepInput);
  }

  private createTagmarkInput() {
    this.tagmarkInput = this.createInput({ type: 'checkbox', className: 'demo__checkbox'});
    this.createLabel('Show tagmark', this.tagmarkInput);
  }

  private createValuesInput() {
    this.valueInput = this.createInput({ type: 'text', name: 'A, B, C', className: 'demo__input' });
    this.createLabel('String values', this.valueInput);
  }

  private createInput(data: { type: string, name?: string, className: string }) {
    const { type, name, className } = data;
    const input = document.createElement('input');
    input.classList.add(className);
    input.type = type;
    input.placeholder = name;
    return input;
  }

  private createLabel(name: string, input: HTMLElement) {
    const label = document.createElement('label');
    label.classList.add('demo__label');
    label.textContent = name;
    label.append(input);
    this.controlPanel.append(label);
  }

  private bindEvents(): void {
    this.colorInput.addEventListener('change', this.handleInputChanged);
    this.rangeInput.addEventListener('change', this.handleInputChanged);
    this.tagmarkInput.addEventListener('change', this.handleInputChanged);
    this.directionInput.addEventListener('change', this.handleInputChanged);
    this.startInput.addEventListener('change', this.handleInputChanged);
    this.endInput.addEventListener('change', this.handleInputChanged);
    this.scalestepInput.addEventListener('change', this.handleInputChanged);
    this.prefixInput.addEventListener('change', this.handleInputChanged);
    this.stepInput.addEventListener('change', this.handleInputChanged);
    this.valueInput.addEventListener('change', this.handleInputChanged);
  }

  @bind
  private handleInputChanged(): void {
    this.options.isRange = this.rangeInput.checked;
    this.options.isVertical = this.directionInput.checked;
    this.options.color = this.colorInput.value;
    this.options.hasTagmark = this.tagmarkInput.checked;
    this.options.start = Number(this.startInput.value);
    this.options.end = Number(this.endInput.value);
    this.options.scaleStep = Number(this.scalestepInput.value);
    this.options.prefix = this.prefixInput.value;
    this.options.step = Number(this.stepInput.value);
    this.options.values = this.valueInput.value.split(',').filter((el) => el.length > 0);
    this.facade.updateOptions(this.options);
    this.updateInputValues();
  }
}
