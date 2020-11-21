import Model from '../Model';

describe('Options validation', () => {
  const model = new Model({});

  beforeEach(() => {
    model.createOptions({});
  });

  test('Set range', () => {
    expect(model.getOptions().isRange).toBe(false);

    model.createOptions({isRange: false});
    expect(model.getOptions().isRange).toBe(false);

    model.createOptions({isRange: true});
    expect(model.getOptions().isRange).toBe(true);
  });

  test('Set direction', () => {
    expect(model.getOptions().isVertical).toBe(false);

    model.createOptions({isVertical: false});
    expect(model.getOptions().isVertical).toBe(false);

    model.createOptions({isVertical: true});
    expect(model.getOptions().isVertical).toBe(true);
  });

  test('Set color', () => {
    expect(model.getOptions().color).toBe('#53b6a8');

    model.createOptions({color: 'purple'});
    expect(model.getOptions().color).toBe('purple');

    model.createOptions({color: '#eee'});
    expect(model.getOptions().color).toBe('#eee');
  });

  test('Has tagmark', () => {
    expect(model.getOptions().hasTagmark).toBe(true);

    model.createOptions({hasTagmark: false});
    expect(model.getOptions().hasTagmark).toBe(false);

    model.createOptions({hasTagmark: true});
    expect(model.getOptions().hasTagmark).toBe(true);
  });

  test('Min value of slider', () => {
    expect(model.getOptions().start).toBe(0);

    model.createOptions({start: 10, end: 50});
    expect(model.getOptions().start).toBe(10);

    model.createOptions({start: 100, end: 50});
    expect(model.getOptions().start).toBe(0);
  });

  test('Max value of slider', () => {
    expect(model.getOptions().end).toBe(100);

    model.createOptions({start: 10, end: 50});
    expect(model.getOptions().end).toBe(50);

    model.createOptions({start: 100, end: 50});
    expect(model.getOptions().end).toBe(100);
  });

  test('Set scaleStep', () => {
    expect(model.getOptions().scaleStep).toBe(100);

    model.createOptions({start: 10, end: 50});
    expect(model.getOptions().scaleStep).toBe(40);

    model.createOptions({start: 0, end: 50, scaleStep: 10});
    expect(model.getOptions().scaleStep).toBe(10);
  });

  test('Set step', () => {
    expect(model.getOptions().step).toBe(1);

    model.createOptions({start: 10, end: 50, step: 80});
    expect(model.getOptions().step).toBe(1);

    model.createOptions({start: 0, end: 50, step: 8});
    expect(model.getOptions().step).toBe(8);
  });

  test('Set prefix', () => {
    expect(model.getOptions().prefix).toBe(null);

    model.createOptions({prefix:'$'});
    expect(model.getOptions().prefix).toBe('$');
  });

  test('Set values, if it is value slider', () => {
    expect(model.getOptions().values).toBe(undefined);

    model.createOptions({values: ['one']});
    expect(model.getOptions().values).toBe(undefined);

    model.createOptions({values: ['one', 'two', 'three']});
    expect(model.getOptions().values).toStrictEqual(['one', 'two', 'three']);
  });

  test('Set "from"-value for handle', () => {
    expect(model.getOptions().from).toBe(null);

    model.createOptions({start: 10, end: 50, isRange: true});
    expect(model.getOptions().from).toBe(10);

    model.createOptions({start: 10, end: 50, isRange: true, from: 20, to: 30});
    expect(model.getOptions().from).toBe(20);

    model.createOptions({start: 10, end: 50, isRange: true, from: 55, to: 30});
    expect(model.getOptions().from).toBe(10);

    model.createOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, from: 'three'});
    expect(model.getOptions().from).toBe('three');
  });

  test('Set "to"-value for handle', () => {
    expect(model.getOptions().to).toBe(0);

    model.createOptions({start: 10, end: 50, isRange: true});
    expect(model.getOptions().to).toBe(11);

    model.createOptions({start: 10, end: 50, isRange: true, from: 20, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.createOptions({start: 10, end: 50, isRange: true, from: 55, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.createOptions({start: 10, end: 50, isRange: true, step: 5});
    expect(model.getOptions().to).toBe(15);

    model.createOptions({start: 10, end: 50, isRange: false, to: 30});
    expect(model.getOptions().to).toBe(30);

    model.createOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, to: 'three'});
    expect(model.getOptions().to).toBe('three');

    model.createOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: true, to: 'ten'});
    expect(model.getOptions().to).toBe('two');

    model.createOptions({values: ['one', 'two', 'three', 'four', 'five'], isRange: false, to: 'five'});
    expect(model.getOptions().to).toBe('five');
  });
});
