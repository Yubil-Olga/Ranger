import Model from './Model';
import NumberSliderOptions from './Options/NumberSliderOptions';
import ValueSliderOptions from './Options/ValueSliderOptions';

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

  test('Model without range should have one data', () => {
    expect(model.data.length).toBe(1);
  });

  test('Model returns correct data', () => {
    expect(model.getData()).toEqual([{ value: -25, positionInPercents: 0, index: 0}]);
  });

  test('Step calculation return size of one step in %', () => {
    expect(model.stepCalculation()).toBe(20);
  });

  test('Position calculation return correct position in %', () => {
    expect(model.positionCalculation({ positionInPercents: 100, step:25, })).toBe(100);
    expect(model.positionCalculation({ positionInPercents: 100, step: 30, })).toBe(100);
    expect(model.positionCalculation({ positionInPercents: 50, step: 10, })).toBe(50);
    expect(model.positionCalculation({ positionInPercents: 50, step: 120, })).toBe(100);
  });

  test('Update values "from" and "to"', () => {
    model.updateValues(0, 50);
    expect(model.getOptions().to).toBe(50);
  });

  test('Updated model calls method update values', () => {
    model.updateValues = jest.fn();
    model.updateModel({index: 0, positionInPercents: 40});
    expect(model.updateValues).toBeCalled();
    expect(model.updateValues).toBeCalledWith(0, 25);
  });

  test('Method update options calls create options', () => {
    model.validateOptions = jest.fn();
    model.updateOptions(options);
    expect(model.validateOptions).toBeCalled();
  });

  test('Method create options set NumberSliderOptions', () => {
    expect(model.getOptions()).toBeInstanceOf(NumberSliderOptions);
  });
});

describe('Value model with range', () => {
  const options = {
    isRange: true,
    isVertical: false,
    prefix: null,
    hasTagmark: true,
    values: ['one', 'two', 'three', 'four', 'five']
  };
  const model = new Model(options);
  model.init();

  test('Init model', () => {
    model.modelChanged.notify = jest.fn();
    model.init();
    expect(model.modelChanged.notify).toBeCalled();
  });

  test('Method create options set NumberSliderOptions', () => {
    expect(model.getOptions()).toBeInstanceOf(ValueSliderOptions);
  });

  test('Update values "from" and "to"', () => {
    model.updateValues(0, 'two');
    model.updateValues(1, 'five');
    expect(model.getOptions().from).toBe('two');
    expect(model.getOptions().to).toBe('five');
  });

  test('Updated model calls method update values', () => {
    model.updateValues = jest.fn();
    model.updateModel({index: 0, positionInPercents: 40});
    expect(model.updateValues).toBeCalled();
    expect(model.updateValues).toBeCalledWith(0, 'three');
  });
});
