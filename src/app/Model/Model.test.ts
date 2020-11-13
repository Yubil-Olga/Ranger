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

  test('Model returns correct data', () => {
    expect(model.getData()).toEqual([{ value: '-25', positionInPercents: 0, index: 0}]);
  });

  test('Step calculation return size of one step in %', () => {
    expect(model.stepCalculation()).toBe(20);
  });

  test('Position calculation return correct position in %', () => {
    expect(model.positionCalculation({ positionInPercents: 100, step:25, })).toBe(100);
    expect(model.positionCalculation({ positionInPercents: 100, step: 30, })).toBe(90);
    expect(model.positionCalculation({ positionInPercents: 50, step: 10, })).toBe(50);
    expect(model.positionCalculation({ positionInPercents: 50, step: 120, })).toBe(0);
  });

  test('Selected number value', () => {
    expect(model.updateModel({ positionInPercents: 0, index: 0 })).toMatchObject([{'positionInPercents': 0, 'value': '-25'}]);
    expect(model.updateModel({ positionInPercents: 25, index: 0})).toMatchObject([{'positionInPercents': 20, 'value': '0'}]);
    expect(model.updateModel({ positionInPercents: 100, index: 0})).toMatchObject([{'positionInPercents': 100, 'value': '100'}]);
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
      color: '#53b6a8',
      scaleStep: 100,
    };
    model.updateOptions(newOptions);
    expect(model.getOptions()).toMatchObject(result);
  });

  test('Update values from and to', () => {
    model.updateValues(0, 50);
    expect(model.getOptions().to).toBe(50);
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
    expect(slider.updateModel({ positionInPercents: 0, index: 0 })).toMatchObject([{'positionInPercents': 0, 'value': 'one'}]);
    expect(slider.updateModel({ positionInPercents: 100, index: 0 })).toMatchObject([{'positionInPercents': 100, 'value': 'three'}]);
  });

  test('Init model', () => {
    slider.modelChanged.notify = jest.fn();
    slider.init();
    expect(slider.modelChanged.notify).toBeCalled();
  });
});
