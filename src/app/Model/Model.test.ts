import Model from './Model';

describe('Number model', () => {
  const options = {
    isRange: false,
    isVertical: false,
    start: -25,
    end: 100,
    step: 25,
    hasTagmark: true,
    prefix: null
  };
  const model = new Model(options);
  model.init();

  test('Step calculation return size of one step in %', () => {
    expect(model.stepCalculation()).toBe(20);
  });

  test('Position calculation return correct position in %', () => {
    expect(model.positionCalculation({ position: 100, step:25, trackWidth: 400 })).toBe(25);
    expect(model.positionCalculation({ position: 100, step: 30, trackWidth: 400 })).toBe(30);
    expect(model.positionCalculation({ position: 200, step: 10, trackWidth: 400 })).toBe(50);
    expect(model.positionCalculation({ position: 50, step: 120, trackWidth: 200 })).toBe(0);
  });

  test('Selected number value', () => {
    expect(model.valueCalculation({ position: 0, trackWidth: 200, index: 0 })).toMatchObject([{'coord': 0, 'value': '-25'}]);
    expect(model.valueCalculation({ position: 25, trackWidth: 125, index: 0})).toMatchObject([{'coord': 20, 'value': '0'}]);
    expect(model.valueCalculation({ position: 300, trackWidth: 300, index: 0})).toMatchObject([{'coord': 100, 'value': '100'}]);
  });

  test('Update options', () => {
    const newOptions = {
      isRange: true,
      isVertical: true,
      start: 0,
      end: 100,
      step: 50,
      hasTagmark: false,
      prefix: null
    };
    const result = {
      isRange: true,
      isVertical: true,
      start: 0,
      end: 100,
      step: 50,
      hasTagmark: false,
      prefix: null,
      color: null,
      scaleStep: 100,
    };
    model.updateOptions(newOptions);
    expect(model.getOptions()).toEqual(result);
  });
});

describe('Value model', () => {
  const options = {
    isRange: false,
    isVertical: false,
    prefix: null,
    hasTagmark: true,
    values: ['one', 'two', 'three']
  };
  const slider = new Model(options);
  slider.init();

  test ('Selected value', () => {
    expect(slider.valueCalculation({ position: 0, trackWidth: 200, index: 0 })).toMatchObject([{'coord': 0, 'value': 'one'}]);
    expect(slider.valueCalculation({ position: 100, trackWidth: 200, index: 0 })).toMatchObject([{'coord': 50, 'value': 'two'}]);
  });

  test('Init model', () => {
    slider.modelChanged.notify = jest.fn();
    slider.init();
    expect(slider.modelChanged.notify).toBeCalled();
  });
});
