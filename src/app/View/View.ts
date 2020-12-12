import Slider from './Slider/Slider';
import { IOptions } from '../IOptions';
import EventDispatcher from '../EventDispatcher/EventDispatcher';

export default class View {
  private options: IOptions
  public slider: Slider
  public rootElement: HTMLElement
  public viewChanged: EventDispatcher = new EventDispatcher();

  constructor(options: IOptions, element: HTMLElement) {
    this.rootElement = element;
    this.options = options;

    this.createTemplate();
    this.addDispatcher();
  }

  createTemplate() {
    this.slider = new Slider(this.options);
    this.rootElement.classList.add('perfect-slider');
    this.setDirection(this.options.isVertical);
    this.setColor(this.options.color);
    this.rootElement.append(this.slider.getElement());
  }

  render(options: IOptions) {
    this.options = options;
    this.slider.removeEventListeners();
    this.slider.getElement().remove();
    this.slider = new Slider(options);
    this.rootElement.append(this.slider.getElement());
    this.setDirection(options.isVertical);
    this.setColor(options.color);
    this.addDispatcher();
    this.rootElement.removeAttribute('data-from');
    this.rootElement.removeAttribute('data-to');
    Object.keys(options).forEach((key) => {
      if (key !== 'defaultOptions') {
        this.setDataAttributes(key, options[key]);
      }
    });
    this.slider.slider.style.setProperty('--transition', '0 ');
  }

  addDispatcher() {
    this.slider.dispatcher.attach((args: {positionInPercents: number, index: number}) => {
      this.viewChanged.notify(args);
    });
  }

  update(data: {positionInPercents: number, index: number, value: string}) {
    const {index, value} = data;

    this.slider.update(data);
    const attributes = this.options.isRange ? [ 'from', 'to'] : ['to'];
    this.setDataAttributes(attributes[index], value);
    this.rootElement.dispatchEvent(new Event('changeHandle'));
  }

  setDataAttributes(key: string, value: string) {
    this.rootElement.dataset[key] = value;
  }

  setDirection(isVertical: boolean) {
    if (isVertical) {
      this.rootElement.classList.add('perfect-slider_vertical');
    } else {
      this.rootElement.classList.remove('perfect-slider_vertical');
    }
  }

  setColor(color: string) {
    if (CSS.supports('background', color)) {
      this.rootElement.style.setProperty('--active-color', color);
    }
  }
}
