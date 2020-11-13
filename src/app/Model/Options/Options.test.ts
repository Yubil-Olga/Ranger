import Model from '../Model';

const arr = [];

arr[0] = {
  options : {start: -25, end: 100, step: 25, scaleStep: 10, prefix: '%', color: 'red', to: 0},
  result : {isRange: false, isVertical: false, start: -25, end: 100, step: 25, scaleStep: 10, hasTagmark: true, prefix: '%', color: 'red', from: null, to: 0},
};

arr[1] = {
  options : {start: 250, end: 100, step: 300, scaleStep: 1000},
  result : {isRange: false, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null},
};

arr[2] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, from: 'one', to: 'two'},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], hasTagmark: true, color: '#53b6a8', prefix: null, from: 'one', to: 'two'},
};

arr[3] = {
  options : {isRange: false, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, hasTagmark: false, color: 'red', to: 'two'},
  result : {isRange: false, isVertical: true, values: ['one', 'two', 'three', 4], color: 'red', hasTagmark: false, prefix: null, to: 'two'},
};
arr[4] = {
  options : {isRange: true, start: 250, end: 100, scaleStep: 1000, from: 0, to: 50},
  result : {isRange: true, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null, from: 0, to: 50},
};
arr[5] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], hasTagmark: true, color: '#53b6a8', prefix: null, from: 'one', to: 'two'},
};

test('Set correct options', ( ) => {
  for (let i=0; i<arr.length; i++) {
    const model = new Model(arr[i].options);
    const param = model.getOptions();
    expect(param).toMatchObject(arr[i].result);
    expect(param.isRange).toBe(arr[i].result.isRange);
    expect(param.isVertical).toBe(arr[i].result.isVertical);
    expect(param.hasTagmark).toBe(arr[i].result.hasTagmark);
    expect(param.color).toBe(arr[i].result.color);
    expect(param.prefix).toBe(arr[i].result.prefix);
    if ('step' in param) {
      expect(param.step).toBe(arr[i].result.step);
      expect(param.scaleStep).toBe(arr[i].result.scaleStep);
    }
    if ('values' in param) {
      expect(param.values).toEqual(arr[i].result.values);
    }
  }
});
