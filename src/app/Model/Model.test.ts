import Model from './Model';

describe('Number model', () => {
  const options = {
    type: 'single',
    direction: null,
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
    expect(model.positionCalculation(100, 25, 400)).toBe(25);
    expect(model.positionCalculation(100, 30, 400)).toBe(30);
    expect(model.positionCalculation(200, 10, 400)).toBe(50);
  });

  test('Selected number value', () => {
    expect(model.valueCalculation(0, 200, 0)).toMatchObject([{'coord': 0, 'value': '-25'}]);
    expect(model.valueCalculation(25, 125, 0)).toMatchObject([{'coord': 20, 'value': '0'}]);
    expect(model.valueCalculation(300, 300, 0)).toMatchObject([{'coord': 100, 'value': '100'}]);
  });

  test('Update options', () => {
    const newOptions = {
      type: 'double',
      direction: 'vertical',
      start: 0,
      end: 100,
      step: 50,
      hasTagmark: false,
      prefix: null
    };
    const result = {
      type: 2,
      direction: 'vertical',
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
    type: 'single',
    direction: null,
    prefix: null,
    hasTagmark: true,
    values: ['one', 'two', 'three']
  };
  const slider = new Model(options);
  slider.init();

  test ('Selected value', () => {
    expect(slider.valueCalculation(0, 200, 0)).toMatchObject([{'coord': 0, 'value': 'one'}]);
    expect(slider.valueCalculation(100, 200, 0)).toMatchObject([{'coord': 50, 'value': 'two'}]);
  });

  test('Init model', () => {
    slider.callCommand = jest.fn();
    slider.init();
    expect(slider.callCommand).toBeCalled();
  });
});
