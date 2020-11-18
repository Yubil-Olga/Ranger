import Slider from './Slider';

describe('Number slider', () => {
  const options = {
    isRange: true,
    isVertical: false,
    prefix: '$',
    start: 0,
    end: 100,
    step: 25,
    scaleStep: 10,
    hasTagmark: true
  };
  const slider = new Slider(options);

  test('Create number slider correctly', () => {
    expect(slider).toBeDefined();
    expect(slider.slider.tagName).toBe('DIV');
    expect(slider.getElement().className).toBe('perfect-slider__track');
  });

  test('Range slider should have two handles', () => {
    expect(slider.handles.length).toBe(2);
  });

  test ('Selected handle', () => {
    slider.handles[0].handle.style.top = '5%';
    expect(slider.getActiveHandleIndex({ positionInPercents: 100, handles: slider.handles })).toBe(0);
  });

  test ('Click event: coord more then width of the element', () => {
    const click = new MouseEvent('click', {
      clientX: 410
    });
    Object.defineProperty(slider.getElement(), 'clientWidth', {value: 360, configurable: true});
    slider.dispatcher.notify = jest.fn();
    slider.handleSliderClick(click);
    expect(slider.dispatcher.notify).not.toBeCalled();
  });

  test ('Mousemove', () => {
    const spy = jest.spyOn(slider, 'handleSliderClick');
    const mousemove = new MouseEvent('mousemove');
    slider.handleHandleMouseDown();
    document.dispatchEvent(mousemove);
    expect(spy).toBeCalled();
  });

  test ('End select', () => {
    const spy = jest.spyOn(slider, 'handleSliderClick');
    spy.mockClear();
    slider.handleDocumentMouseUp();
    const mousemove = new MouseEvent('mousemove');
    const mouseup = new MouseEvent('mouseup');
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(spy).not.toBeCalled();
  });
});

describe('Value slider with range', () => {
  const options = {
    isRange: true,
    values: ['one', 'two', 'three', 'four', 'five'],
    isVertical: true,
    hasTagmark: true,
    prefix: null
  };
  const slider = new Slider(options);

  test ('Selected handle', () => {
    slider.handles[0].moveHandle(5, true);
    slider.handles[1].moveHandle(80, true);

    expect(slider.getActiveHandleIndex({ positionInPercents: 100, handles: slider.handles })).toBe(1);
  });
});
