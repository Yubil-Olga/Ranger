import Slider from './Slider';
import Data from '../../Model/Data/Data';
window.CSS = { escape: jest.fn(), supports: jest.fn()};

describe('Number slider', () => {
  const options = {
    isRange: false,
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
    expect(slider.handles.length).toBe(1);
    expect(slider.handles.length).toBe(1);
    expect(slider.getElement().className).toBe('perfect-slider__track');
  });

  test('Move bar', () => {
    const data1 = new Data(0, options);
    data1.update('80', 80);
    slider.bar.moveBar({ index: 0, positionInPercents: 80, isRange: options.isRange, isVertical: options.isVertical });
    expect(slider.bar.bar.style.left).toBe('');
    expect(slider.bar.bar.style.right).toBe('20%');
  });

  test('Update function', () => {
    slider.bar.moveBar = jest.fn();
    const data = new Data(0, options);
    data.update('50', 50);
    slider.update({ positionInPercents: 50, index: 0, value: '50'});
    expect(slider.handles[0].tagmark.tagmark.textContent).toBe('50 $');
    expect(slider.bar.moveBar).toBeCalledWith({ index: 0, positionInPercents: 50, isRange: false, isVertical: false });
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

describe('Value slider', () => {
  const options = {
    isRange: true,
    isVertical: true,
    values: ['one', 'two', 'three'],
    color: 'red',
    hasTagmark: false,
    prefix: null
  };
  const slider = new Slider(options);

  test('Create value slider correctly', () => {
    expect(slider).toBeDefined();
    expect(slider.handles.length).toBe(2);
  });

  test('Move bar', () => {
    const data1 = new Data(0, options);
    const data2 = new Data(1, options);
    data1.update('two', 50);
    data2.update('three', 100);
    slider.bar.moveBar({ index: 0, positionInPercents: 50, isRange: options.isRange, isVertical: options.isVertical });
    slider.bar.moveBar({ index: 1, positionInPercents: 100, isRange: options.isRange, isVertical: options.isVertical });
    expect(slider.bar.bar.style.top).toBe('50%');
    expect(slider.bar.bar.style.bottom).toBe('0%');
  });

  test('Update function', () => {
    slider.bar.moveBar = jest.fn();
    const data1 = new Data(0, options);
    const data2 = new Data(1, options);
    data1.update('two', 50);
    data2.update('three', 100);
    slider.update({ positionInPercents: 50, index: 0, value: 'two' });
    slider.update({ positionInPercents: 100, index: 1, value: 'three' });
    expect(slider.handles[0].tagmark.tagmark.textContent).toBe('two');
    expect(slider.handles[1].tagmark.tagmark.textContent).toBe('three');
    expect(slider.bar.moveBar). toBeCalledWith({ index: 0, positionInPercents: 50, isRange: true, isVertical: true });
    expect(slider.bar.moveBar).toBeCalledWith({ index: 1, positionInPercents: 100, isRange: true, isVertical: true });
  });
});

describe('Horizontal double slider: move bar', () => {
  const options = {
    isRange: true,
    isVertical: false,
    start: 0,
    end: 100,
    scaleStep: 10,
  };
  const slider = new Slider(options);

  test('Move bar', () => {
    const data1 = new Data(0, options);
    const data2 = new Data(1, options);
    data1.update('30', 30);
    data2.update('100', 100);
    slider.bar.moveBar({ index: 0, positionInPercents: 30, isRange: options.isRange, isVertical: options.isVertical });
    slider.bar.moveBar({ index: 1, positionInPercents: 100, isRange: options.isRange, isVertical: options.isVertical });
    expect(slider.bar.bar.style.left).toBe('30%');
    expect(slider.bar.bar.style.right).toBe('0%');
  });
});

