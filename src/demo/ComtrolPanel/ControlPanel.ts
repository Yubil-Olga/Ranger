import '../../app/app';
import Facade from '../../app/Presenter/Facade';
import IOptions from '../../app/IOptions';
import Field from './Field';

export default class ControlPanel {
  private facade: Facade
  private options: IOptions
  private controlPanel: HTMLElement
  private inputs: Array<Field>

  constructor(facade: Facade) {
    this.facade = facade[0];
    this.init();
    this.bindEvents();
  }

  getState = () => {
    return [
      { type: 'checkbox', label: 'Is range', key: 'isRange', },
      { type: 'checkbox', label: 'Is vertical', key: 'isVertical', },
      { type: 'text', label: 'Color', key: 'color', },
      { type: 'text', label: 'Prefix', key: 'prefix', },
      { type: 'number', label: 'Min value', key: 'start', },
      { type: 'number', label: 'Max value', key: 'end', },
      { type: 'number', label: 'Step of slider', key: 'step', },
      { type: 'number', label: 'Scale step', key: 'scaleStep', },
      { type: 'checkbox', label: 'Show tagmark', key: 'hasTagmark', },
      { type: 'textarea', label: 'String values', key: 'values', },
    ];
  };

  init() {
    this.options = this.facade.getOptions();
    this.inputs = [];

    this.controlPanel = document.createElement('div');
    this.controlPanel.classList.add('demo__control-panel');

    this.getState().forEach((element) => {
      const field = new Field(element);
      field.setValue(this.options[element.key]);
      this.controlPanel.append(field.label);
      this.inputs.push(field);
    });
  }

  getElement() {
    return this.controlPanel;
  }

  private bindEvents(): void {
    this.inputs.forEach((field) => {
      const handleInputChanged = this.handleInputChanged.bind(this, field);
      field.input.addEventListener('change', handleInputChanged);
    });
  }

  private handleInputChanged(field: Field): void {
    const name = field.input.getAttribute('name');
    const value = field.getInputValue(field.input.getAttribute('type'));
    this.options[name] = value;

    this.facade.updateOptions(this.options);
    field.setValue(this.facade.getOptions()[name]);
  }
}
