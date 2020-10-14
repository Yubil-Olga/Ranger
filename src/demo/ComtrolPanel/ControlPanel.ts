import bind from 'bind-decorator';
import IUserSettings from '../../app/IUserSettings';
import '../../app/app';
import Facade from '../../app/Presenter/Facade';

export default class ControlPanel {
  private facade: Facade
  private settings: IUserSettings
  private controlPanel: HTMLElement
  private colorInput: HTMLInputElement
  private prefixInput: HTMLInputElement
  private typeInput: HTMLSelectElement
  private directionInput: HTMLSelectElement
  private startInput: HTMLInputElement
  private endInput: HTMLInputElement
  private stepInput: HTMLInputElement
  private scalestepInput: HTMLInputElement
  private tagmarkInput: HTMLInputElement
  private valueInput: HTMLInputElement

  constructor(settings: IUserSettings, facade: Facade) {
    this.facade = facade[0];
    this.settings = settings;
    this.init(settings);
  }

  getElement() {
    return this.controlPanel;
  }

  init(settings: IUserSettings) {
    this.controlPanel = document.createElement('div');
    this.controlPanel.classList.add('demo__control-panel');
    this.createColorInput(settings.color);
    this.createPrefixInput(settings.prefix);
    this.createTypeInput(settings.type);
    this.createDirectionInput(settings.direction);
    this.createMinValueInput(settings.start);
    this.createMaxValueInput(settings.end);
    this.createSliderStepInput(settings.step);
    this.createScaleStepInput(settings.scaleStep);
    this.createTagmarkInput(settings.hasTagmark);
    this.createValuesInput(settings.values);
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

  private createTypeInput(type: string) {
    this.typeInput = this.createSelect(['single', 'double']);
    this.typeInput.value = type ? type : 'single';
    this.createLabel('Type', this.typeInput);
  }

  private createDirectionInput(direction: string) {
    this.directionInput = this.createSelect(['horizontal', 'vertical']);
    this.directionInput.value = direction ? direction : 'horizontal';
    this.createLabel('Direction', this.directionInput);
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
    this.tagmarkInput.placeholder = 'tagmark';
    this.tagmarkInput.classList.add('demo__checkbox');
    this.tagmarkInput.checked = (hasTagmark === false) ? false : true;
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

  private createSelect(name: Array<string>) {
    const select = document.createElement('select');
    select.classList.add('demo__input');
    for (let i=0; i<name.length; i++) {
      const option = document.createElement('option');
      option.value = name[i];
      option.textContent = name[i];
      select.append(option);
    }
    return select;
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
    this.typeInput.addEventListener('change', this.handleInputChanged);
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
    this.settings.color = this.colorInput.value;
    this.settings.type = this.typeInput.value;
    this.settings.direction = this.directionInput.value;
    this.settings.hasTagmark = this.tagmarkInput.checked;
    this.settings.start = Number(this.startInput.value);
    this.settings.end = Number(this.endInput.value);
    this.settings.scaleStep = Number(this.scalestepInput.value);
    this.settings.prefix = this.prefixInput.value;
    this.settings.step = Number(this.stepInput.value);
    this.settings.values = this.valueInput.value.split(',').filter((el) => el.length > 0);
    this.facade.updateOptions(this.settings);
  }
}
