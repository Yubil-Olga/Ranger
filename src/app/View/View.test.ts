import Slider from './Slider/Slider';
import View from './View';
window.CSS = { escape: jest.fn(), supports: jest.fn()};

describe('Single slider', () => {
  const div = document.createElement('div');
  const options = {
    isRange: false,
    isVertical: false,
    hasTagmark: true,
    prefix: null,
    start: 0,
    end: 200,
    step: 10,
    scaleStep: 10,
  };
  const view = new View(options, div);

  test ('Click event', () => {
    const click = new MouseEvent('click', {
      clientX: 140,
    });
    Object.defineProperty(view.slider.getElement(), 'clientWidth', {value: 260, configurable: true});
    Object.defineProperty(view.slider.getElement(), 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });
    view.slider.shift = {
      x: 0,
      y: 0
    };

    view.viewChanged.notify = jest.fn();
    view.slider.handleSliderMouseDown(click);
    expect(view.viewChanged.notify).toBeCalled();
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 50, index: 0 });
  });

  test('Update options', () => {
    const newOptions = {
      isRange: false,
      isVertical: false,
      hasTagmark: true,
      prefix: null,
      start: 0,
      end: 200,
      step: 10,
      scaleStep: 10,
    };
    const sliderUpdated = new Slider(newOptions);
    view.render(newOptions);

    expect(view.slider.options).toEqual(sliderUpdated.options);
    expect(JSON.stringify(view.slider.handles)).toEqual(JSON.stringify(sliderUpdated.handles));
    expect(view.slider.scale).toEqual(sliderUpdated.scale);
    expect(view.slider.bar).toEqual(sliderUpdated.bar);
    expect(view.slider.slider).toEqual(sliderUpdated.slider);
  });
});

describe('Double slider', () => {
  const div = document.createElement('div');
  const options = {
    isRange: true,
    values: ['one', 'two', 'three', 'four', 'five'],
    isVertical: true,
    hasTagmark: true,
    prefix: null
  };
  const view = new View(options, div);

  test('Call command', () => {
    view.viewChanged.notify = jest.fn();
    view.viewChanged.notify({ trackWidth: 261, position: 100, index: 0 });
    expect(view.viewChanged.notify).toBeCalledWith({trackWidth: 261, position: 100, index: 0});
  });

  test ('Click event', () => {
    const mouseDown = new MouseEvent('mousedown', {
      clientY: 128
    });
    Object.defineProperty(view.slider.getElement(), 'clientHeight', {value: 260, configurable: true});
    Object.defineProperty(view.slider.getElement(), 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });
    view.slider.shift = {
      x: 0,
      y: 0
    };
    view.viewChanged.notify = jest.fn();
    view.slider.getElement().dispatchEvent(mouseDown);

    expect(view.viewChanged.notify).toBeCalled();
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 30, index: 0 });
    expect(view.slider.getElement().style.getPropertyValue('--transition')).toBe('0.5s');
  });
});

describe('One more slider', () => {
  const div = document.createElement('div');
  const options = {
    isRange: true,
    values: ['one', 'two', 'three', 'four', 'five'],
    isVertical: false,
    hasTagmark: true,
    prefix: null
  };
  const view = new View(options, div);

  test ('Selected handle', () => {
    view.slider.handles[0].moveHandle({positionInPercents: 5, isVertical: true});
    view.slider.handles[1].moveHandle({positionInPercents: 80, isVertical: true});

    expect(view.slider.getActiveHandleIndex({ positionInPercents: 100, handles: view.slider.handles })).toBe(1);
  });

  test('View changed to be called', () => {
    view.viewChanged.notify = jest.fn();
    view.viewChanged.notify({ positionInPercents: 40, index: 0 });
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 40, index: 0 });
  });

  test ('Click event', () => {
    const mouseDown = new MouseEvent('mousedown', {
      clientX: 140,
    });
    Object.defineProperty(view.slider.getElement(), 'clientWidth', {value: 260});
    Object.defineProperty(view.slider.getElement(), 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });
    view.slider.shift = {
      x: 0,
      y: 0
    };
    view.viewChanged.notify = jest.fn();
    view.slider.getElement().dispatchEvent(mouseDown);

    expect(view.viewChanged.notify).toBeCalled();
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 50, index: 1 });
    expect(view.slider.getElement().style.getPropertyValue('--transition')).toBe('0.5s');
  });

  test ('Click event: coordinate more then width of the element', () => {
    const click = new MouseEvent('click', {
      clientX: 270
    });
    Object.defineProperty(view.slider.getElement(), 'clientWidth', {value: 260});
    view.viewChanged.notify = jest.fn();
    view.slider.handleSliderMouseDown(click);
    expect(view.viewChanged.notify).toBeCalled();
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 100, index: 1 });
  });

  test ('Click event: coordinate less then 0', () => {
    const click = new MouseEvent('click', {
      clientX: 10
    });
    Object.defineProperty(view.slider.getElement(), 'clientWidth', {value: 260});
    view.viewChanged.notify = jest.fn();
    view.slider.handleSliderMouseDown(click);
    expect(view.viewChanged.notify).toBeCalled();
    expect(view.viewChanged.notify).toBeCalledWith({ positionInPercents: 0, index: 0 });
  });

  test('Transition duration', () => {
    view.slider.setTransitionDuration(view.slider.handles[0].handle);
    expect(view.slider.getElement().style.getPropertyValue('--transition')).toBe('0');
  });
});
