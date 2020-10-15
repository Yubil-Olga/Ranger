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

  getElement() {
    return this.controlPanel;
  }

  init() {
    this.options = this.facade.getOptions();
    this.controlPanel = document.createElement('div');
    this.controlPanel.classList.add('demo__control-panel');
    this.createRangeInput(this.options.isRange);
    this.createDirectionInput(this.options.isVertical);
    this.createColorInput(this.options.color);
    this.createPrefixInput(this.options.prefix);
    this.createMinValueInput(this.options.start);
    this.createMaxValueInput(this.options.end);
    this.createSliderStepInput(this.options.step);
    this.createScaleStepInput(this.options.scaleStep);
    this.createTagmarkInput(this.options.hasTagmark);
    this.createValuesInput(this.options.values);
    this.bindEvents();
  }

  private createColorInput(color: string) {
    this.colorInput = this.createInput('text', 'color');
    this.colorInput.value = color !== undefined? color : '#53b6a8';
    this.createLabel('Color', this.colorInput);
  }

  private createPrefixInput(prefix: string) {
    this.prefixInput = this.createInput('text', 'prefix');
    this.prefixInput.value = prefix ? prefix : null;
    this.createLabel('Prefix', this.prefixInput);
  }

  private createRangeInput(isRange: boolean) {
    this.rangeInput = document.createElement('input');
    this.rangeInput.type = 'checkbox';
    this.rangeInput.classList.add('demo__checkbox');
    this.rangeInput.checked = isRange;
    this.createLabel('Is range', this.rangeInput);
  }

  private createDirectionInput(isVertical: boolean) {
    this.directionInput = document.createElement('input');
    this.directionInput.type = 'checkbox';
    this.directionInput.classList.add('demo__checkbox');
    this.directionInput.checked = isVertical;
    this.createLabel('Is vertical', this.directionInput);
  }

  private createMinValueInput(start: number) {
    this.startInput = this.createInput('number', 'from');
    this.startInput.value = start? start.toString() : null;
    this.createLabel('Min value', this.startInput);
  }

  private createMaxValueInput(end: number) {
    this.endInput = this.createInput('number', 'to');
    this.endInput.value = end ? end.toString() : null;
    this.createLabel('Max value', this.endInput);
  }

  private createSliderStepInput(step: number) {
    this.stepInput = this.createInput('number', 'step');
    this.stepInput.value = step? step.toString() : null;
    this.createLabel('Step of slider', this.stepInput);
  }

  private createScaleStepInput(scalestep: number) {
    this.scalestepInput = this.createInput('number', 'step of the scale');
    this.scalestepInput.value = scalestep? scalestep.toString() : null;
    this.createLabel('Scale step', this.scalestepInput);
  }

  private createTagmarkInput(hasTagmark: boolean) {
    this.tagmarkInput = document.createElement('input');
    this.tagmarkInput.type = 'checkbox';
    this.tagmarkInput.classList.add('demo__checkbox');
    this.tagmarkInput.checked = hasTagmark;
    this.createLabel('Show tagmark', this.tagmarkInput);
  }

  private createValuesInput(values: Array<string>) {
    this.valueInput = this.createInput('text', 'A, B, C');
    this.valueInput.value = values? values.join(',') : null;
    this.createLabel('String values', this.valueInput);
  }

  private createInput(type: string, name: string) {
    const input = document.createElement('input');
    input.classList.add('demo__input');
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

  private updateInputValues() {
    this.startInput.value = this.facade.getOptions().start ? this.facade.getOptions().start.toString(): null;
    this.endInput.value = this.facade.getOptions().end ? this.facade.getOptions().end.toString() : null;
    this.stepInput.value = this.facade.getOptions().step ? this.facade.getOptions().step.toString(): null;
    this.scalestepInput.value = this.facade.getOptions().scaleStep ? this.facade.getOptions().scaleStep.toString() : null;
    this.colorInput.value = this.facade.getOptions().color;
    this.prefixInput.value = this.facade.getOptions().prefix;
    this.valueInput.value = this.facade.getOptions().values ? this.facade.getOptions().values.toString() : null;
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
