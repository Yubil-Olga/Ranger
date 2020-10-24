export default class Field {
  public input: HTMLInputElement
  public label: HTMLElement

  constructor(data: {type: string, label: string, key: string}) {
    this.input = this.createInput({ type: data.type, name: data.key});
    this.label = this.createLabel({name: data.label});
    this.label.append(this.input);
  }

  getInputValue(type: string) {
    const values = {
      'checkbox': this.input.checked,
      'number': Number(this.input.value),
      'text': this.input.value,
      'textarea': this.input.value.split(',').filter((el) => el.length > 0)
    };

    return values[type];
  }

  setValue(value: any) {
    if (typeof value === 'boolean') {
      this.input.checked = value;
    }
    else {
      this.input.value = value ? value.toString() : '';
    }
  }

  private createInput(data: { type: string, name: string }) {
    const { type, name } = data;
    const input = document.createElement('input');
    const className = type === 'checkbox' ? 'demo__checkbox' : 'demo__input';
    input.classList.add(className);
    input.type = type;
    input.placeholder = type !== 'checkbox' ? name : '';
    input.name = name;
    return input;
  }

  private createLabel(data: { name: string }) {
    const { name } = data;
    const label = document.createElement('label');
    label.classList.add('demo__label');
    label.textContent = name;
    return label;
  }
}