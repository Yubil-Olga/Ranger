import Slider from './Slider';
import Data from '../../Model/Data/Data';

describe('Number slider', () => {
  const options = {
    isRange: false,
    isVertical: false,
    prefix: '$',
    start: 0,
    end: 100,
    step: 25,
    scalestep: 10,
    hasTagmark: true
  };
  const slider = new Slider(options);

  test('Create number slider correctly', () => {
    expect(slider).toBeDefined();
    expect(slider.thumblers.length).toBe(1);
    expect(slider.tagmarks.length).toBe(1);
    expect(slider.container.className).toBe('slider');
  });
  test('Move thumbs', () => {
    const data = new Data(0, options);
    data.update('100', 100);
    slider.moveThumbs(data, 0);
    expect(slider.thumblers[0].style.left).toBe('100%');
  });
  test('Move bar', () => {
    const data1 = new Data(0, options);
    data1.update('80', 80);
    slider.moveBar([data1]);
    expect(slider.barSelected.style.left).toBe('0%');
    expect(slider.barSelected.style.right).toBe('20%');
  });
  test('Update function', () => {
    slider.moveBar = jest.fn();
    slider.moveThumbs = jest.fn();
    const data = new Data(0, options);
    data.update('50', 50);
    slider.update([data]);
    expect(slider.value.value).toBe('50');
    expect(slider.tagmarks[0].textContent).toBe('50 $');
    expect(slider.moveBar).toBeCalledWith([data]);
    expect(slider.moveThumbs).toBeCalled();
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
    expect(slider.thumblers.length).toBe(2);
    expect(slider.tagmarks.length).toBe(2);
    expect(slider.container.style.getPropertyValue('--active-color')).toBe('red');
    expect(slider.container.className).toBe('slider slider_vertical');
  });
  test('Move thumbs', () => {
    const data = new Data(0, options);
    data.update('two', 50);
    slider.moveThumbs(data, 0);
    expect(slider.thumblers[0].style.top).toBe('50%');
  });
  test('Move bar', () => {
    const data1 = new Data(0, options);
    const data2 = new Data(1, options);
    data1.update('two', 50);
    data2.update('three', 100);
    slider.moveBar([data1, data2]);
    expect(slider.barSelected.style.top).toBe('50%');
    expect(slider.barSelected.style.bottom).toBe('0%');
  });
  test('Update function', () => {
    slider.moveBar = jest.fn();
    slider.moveThumbs = jest.fn();
    const data1 = new Data(0, options);
    const data2 = new Data(1, options);
    data1.update('two', 50);
    data2.update('three', 100);
    slider.update([data1, data2]);
    expect(slider.value.value).toBe('two;three');
    expect(slider.tagmarks[0].textContent).toBe('two');
    expect(slider.tagmarks[1].textContent).toBe('three');
    expect(slider.moveBar).toBeCalledWith([data1, data2]);
    expect(slider.moveThumbs).toBeCalled();
  });
});
