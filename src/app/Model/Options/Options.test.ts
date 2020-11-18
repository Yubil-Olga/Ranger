import Model from '../Model';

const arr = [];

arr[0] = {
  options : {start: -25, end: 100, step: 25, scaleStep: 10, prefix: '%', color: 'red', to: 0},
  result : {isRange: false, isVertical: false, start: -25, end: 100, step: 25, scaleStep: 10, hasTagmark: true, prefix: '%', color: 'red', from: null, to: 0},
};

arr[1] = {
  options : {start: 250, end: 100, step: 300, scaleStep: 1000},
  result : {isRange: false, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null, from: null, to: 0},
};

arr[2] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, from: 'one', to: 'two'},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], hasTagmark: true, color: '#53b6a8', prefix: null, from: 'one', to: 'two'},
};

arr[3] = {
  options : {isRange: false, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, hasTagmark: false, color: 'red', to: 'three'},
  result : {isRange: false, isVertical: true, values: ['one', 'two', 'three', 4], color: 'red', hasTagmark: false, prefix: null, from: null, to: 'three'},
};

arr[4] = {
  options : {isRange: true, start: 250, end: 100, scaleStep: 1000, from: 0, to: 50},
  result : {isRange: true, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null, from: 0, to: 50},
};

arr[5] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], hasTagmark: true, color: '#53b6a8', prefix: null, from: 'one', to: 'two'},
};
arr[6] = {
  options : {isRange: true, start: 250, end: 100, scaleStep: 1000, from: 100},
  result : {isRange: true, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null, from: 0, to: 1},
};

arr[7] = {
  options : {isRange: false, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, hasTagmark: false, color: 'red', },
  result : {isRange: false, isVertical: true, values: ['one', 'two', 'three', 4], color: 'red', hasTagmark: false, prefix: null, from: null, to: 'two'},
};

arr.forEach((el) => {
  const model = new Model(el.options);
  const options = model.getOptions();

  test('Set range', () => {
    expect(options.isRange).toBe(el.result.isRange);
  });

  test('Set direction', () => {
    expect(options.isVertical).toBe(el.result.isVertical);
  });

  test('Set color', () => {
    expect(options.color).toBe(el.result.color);
  });

  test('Has tagmark', () => {
    expect(options.hasTagmark).toBe(el.result.hasTagmark);
  });

  test('Min value of slider', () => {
    expect(options.start).toBe(el.result.start);
  });

  test('Max value of slider', () => {
    expect(options.end).toBe(el.result.end);
  });

  test('Set scaleStep', () => {
    expect(options.scaleStep).toBe(el.result.scaleStep);
  });

  test('Set step', () => {
    expect(options.step).toBe(el.result.step);
  });

  test('Set prefix', () => {
    expect(options.prefix).toBe(el.result.prefix);
  });

  test('Set values, if it is value slider', () => {
    expect(options.values).toEqual(el.result.values);
  });

  test('Set "from"-value for handle', () => {
    expect(options.from).toBe(el.result.from);
  });

  test('Set "to"-value for handle', () => {
    expect(options.to).toBe(el.result.to);
  });
});
