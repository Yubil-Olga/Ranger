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

  test ('Selected thumbler', () => {
    const event = new MouseEvent('click');
    view.slider.thumblers[0].style.top = '5%';
    expect(view.getActiveThumblerIndex({ positionInPercents: 100, thumblers: view.slider.thumblers })).toBe(0);
  });

  test ('Mousedown event', () => {
    const spy = jest.spyOn(view, 'startSelect');
    const mousedown = new MouseEvent('mousedown');
    view.slider.thumblers[0].querySelector('.perfect-slider__thumb-marker').dispatchEvent(mousedown);
    view.handleSliderMouseDown(mousedown);
    expect(spy).toBeCalled();
  });

  test ('Mousemove', () => {
    const spy = jest.spyOn(view, 'handleSliderClick');
    view.startSelect();
    const mousemove = new MouseEvent('mousemove');
    document.dispatchEvent(mousemove);
    expect(spy).toBeCalled();
  });

  test ('End select', () => {
    const spy = jest.spyOn(view, 'handleSliderClick');
    spy.mockClear();
    view.handleDocumentMouseUp();
    const mousemove = new MouseEvent('mousemove');
    const mouseup = new MouseEvent('mouseup');
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(spy).not.toBeCalled();
  });

  test ('Click event', () => {
    const smth = new MouseEvent('click', {
      clientX: 140
    });
    Object.defineProperty(view.slider.track, 'clientWidth', {value: 260, configurable: true});
    Object.defineProperty(view.slider.track, 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });

    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 50, index: 0 });
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
    view.updateOptions(newOptions);
    expect(view.slider).toEqual(sliderUpdated);
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

  test ('Selected thumbler', () => {
    view.slider.thumblers[0].style.top = '5%';
    view.slider.thumblers[1].style.top = '80%';
    expect(view.getActiveThumblerIndex({ positionInPercents: 100, thumblers: view.slider.thumblers })).toBe(1);
  });

  test('Call comand', () => {
    view.inputChanged.notify = jest.fn();
    view.inputChanged.notify({ trackWidth: 261, position: 100, index: 0 });
    expect(view.inputChanged.notify).toBeCalledWith({trackWidth: 261, position: 100, index: 0});
  });

  test ('Click event', () => {
    const smth = new MouseEvent('click', {
      clientY: 128
    });
    Object.defineProperty(view.slider.track, 'clientHeight', {value: 260, configurable: true});
    Object.defineProperty(view.slider.track, 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 30, index: 0 });
    expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0.5s');
  });

  test ('Click event: coord more then width of the element', () => {
    const smth = new MouseEvent('click', {
      clientY: 410
    });
    Object.defineProperty(view.slider.track, 'clientHeight', {value: 360, configurable: true});
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 100, index: 1 });
  });

  test ('Click event: coord less then 0', () => {
    const smth = new MouseEvent('click', {
      clientY: 180
    });
    Object.defineProperty(view.slider.track, 'clientHeight', {value: 260, configurable: true});
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 50, index: 1 });
  });

  test('Transition duration', () => {
    const mousedown = new MouseEvent('mousedown');
    view.setTransitionDuration(mousedown);
    expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0');
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

  test ('Selected thumbler', () => {
    const event = new MouseEvent('click');
    view.slider.thumblers[0].style.left = '5%';
    view.slider.thumblers[1].style.left = '80%';
    expect(view.getActiveThumblerIndex({ positionInPercents: 100,thumblers: view.slider.thumblers })).toBe(1);
  });

  test('Call comand', () => {
    view.inputChanged.notify = jest.fn();
    view.inputChanged.notify({ positionInPercents: 40, index: 0 });
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 40, index: 0 });
  });

  test ('Click event', () => {
    const smth = new MouseEvent('click', {
      clientX: 140
    });
    Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
    Object.defineProperty(view.slider.track, 'getBoundingClientRect', {
      value: function() {
        return { bottom: 0, height: 0, left: 10, right: 0, top: 50 };
      }
    });
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 50, index: 1 });
    expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0.5s');
  });

  test ('Click event: coord more then width of the element', () => {
    const smth = new MouseEvent('click', {
      clientX: 270
    });
    Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 100, index: 1 });
  });

  test ('Click event: coord less then 0', () => {
    const smth = new MouseEvent('click', {
      clientX: 10
    });
    Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
    view.inputChanged.notify = jest.fn();
    view.handleSliderClick(smth);
    expect(view.inputChanged.notify).toBeCalled();
    expect(view.inputChanged.notify).toBeCalledWith({ positionInPercents: 0, index: 0 });
  });

  test('Transition duration', () => {
    const mousedown = new MouseEvent('mousedown');
    view.setTransitionDuration(mousedown);
    expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0');
  });
});
