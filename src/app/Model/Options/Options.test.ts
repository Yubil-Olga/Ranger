import Model from '../Model';

describe('Options validation', () => {
  const model = new Model({});

  beforeEach(() => {
    model.validateOptions({});
  });

  test('Set range', () => {
    expect(model.getOptions().isRange).toBe(false);

    model.validateOptions({isRange: false});
    expect(model.getOptions().isRange).toBe(false);

    model.validateOptions({isRange: true});
    expect(model.getOptions().isRange).toBe(true);
  });

  test('Set direction', () => {
    expect(model.getOptions().isVertical).toBe(false);

    model.validateOptions({isVertical: false});
    expect(model.getOptions().isVertical).toBe(false);

    model.validateOptions({isVertical: true});
    expect(model.getOptions().isVertical).toBe(true);
  });

  test('Set color', () => {
    expect(model.getOptions().color).toBe('#53b6a8');

    model.validateOptions({color: 'purple'});
    expect(model.getOptions().color).toBe('purple');

    model.validateOptions({color: '#eee'});
    expect(model.getOptions().color).toBe('#eee');
  });

  test('Has tagmark', () => {
    expect(model.getOptions().hasTagmark).toBe(true);

    model.validateOptions({hasTagmark: false});
    expect(model.getOptions().hasTagmark).toBe(false);

    model.validateOptions({hasTagmark: true});
    expect(model.getOptions().hasTagmark).toBe(true);
  });

  test('Min value of slider', () => {
    expect(model.getOptions().start).toBe(0);

    model.validateOptions({start: 10, end: 50});
    expect(model.getOptions().start).toBe(10);

    model.validateOptions({start: 100, end: 50});
    expect(model.getOptions().start).toBe(0);
  });

  test('Max value of slider', () => {
    expect(model.getOptions().end).toBe(100);

    model.validateOptions({start: 10, end: 50});
    expect(model.getOptions().end).toBe(50);

    model.validateOptions({start: 100, end: 50});
    expect(model.getOptions().end).toBe(100);
  });

  test('Set scaleStep', () => {
    expect(model.getOptions().scaleStep).toBe(100);

    model.validateOptions({start: 10, end: 50});
    expect(model.getOptions().scaleStep).toBe(40);

    model.validateOptions({start: 0, end: 50, scaleStep: 10});
    expect(model.getOptions().scaleStep).toBe(10);

    model.validateOptions({start: 0, end: 50, step: 15, scaleStep: 4});
    expect(model.getOptions().scaleStep).toBe(15);
  });

  test('Set step', () => {
    expect(model.getOptions().step).toBe(1);

    model.validateOptions({start: 10, end: 50, step: 80});
    expect(model.getOptions().step).toBe(1);

    model.validateOptions({start: 0, end: 50, step: 8});
    expect(model.getOptions().step).toBe(8);
  });

  test('Set prefix', () => {
    expect(model.getOptions().prefix).toBe(null);

    model.validateOptions({prefix:'$'});
    expect(model.getOptions().prefix).toBe('$');
  });

  test('Set values, if it is value slider', () => {
    expect(model.getOptions().values).toBe(undefined);

    model.validateOptions({values: ['one']});
    expect(model.getOptions().values).toBe(undefined);

    model.validateOptions({values: ['one', 'two', 'three']});
    expect(model.getOptions().values).toStrictEqual(['one', 'two', 'three']);
  });

  test('Set "from"-value for handle', () => {
    expect(model.getOptions().from).toBe(null);

    model.validateOptions({start: 10, end: 50, isRange: true});
    expect(model.getOptions().from).toBe(10);

    model.validateOptions({start: 10, end: 50, isRange: true, from: 20, to: 30});
    expect(model.getOptions().from).toBe(20);

    model.validateOptions({start: 10, end: 50, isRange: true, from: 55, to: 30});
    expect(model.getOptions().from).toBe(10);

    model.validateOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, from: 'three'});
    expect(model.getOptions().from).toBe('three');
  });

  test('Set "to"-value for handle, when number-slider is range', () => {
    model.validateOptions({start: 10, end: 50, isRange: true});
    expect(model.getOptions().to).toBe(11);

    model.validateOptions({start: 10, end: 50, isRange: true, from: 20, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.validateOptions({start: 10, end: 50, isRange: true, from: 55, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.validateOptions({start: 10, end: 50, isRange: true, step: 5});
    expect(model.getOptions().to).toBe(15);
  });

  test('Set "to"-value for handle, when number-slider is not range', () => {
    expect(model.getOptions().to).toBe(0);

    model.validateOptions({start: 10, end: 50, isRange: false, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.validateOptions({start: 10, end: 50, isRange: false, to: 80});
    expect(model.getOptions().to).toBe(50);

    model.validateOptions({start: 10, end: 50, isRange: false, to: 0});
    expect(model.getOptions().to).toBe(10);
  });

  test('Set "to"-value for handle, when value-slider is range', () => {
    model.validateOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, to: 'three'});
    expect(model.getOptions().to).toBe('three');

    model.validateOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, to: 'ten'});
    expect(model.getOptions().to).toBe('two');
  });

  test('Set "to"-value for handle, when value-slider is not range', () => {
    model.validateOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: false, to: 'five'});
    expect(model.getOptions().to).toBe('five');
  });
});
