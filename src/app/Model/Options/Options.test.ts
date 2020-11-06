import Model from '../Model';

const arr = [];

arr[0] = {
  options : {start: -25, end: 100, step: 25, scaleStep: 10, prefix: '%', color: 'red'},
  result : {isRange: false, isVertical: false, start: -25, end: 100, step: 25, scaleStep: 10, hasTagmark: true, prefix: '%', color: 'red'},
};

arr[1] = {
  options : {start: 250, end: 100, step: 300, scaleStep: 1000},
  result : {isRange: false, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null},
};

arr[2] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], hasTagmark: true, color: '#53b6a8', prefix: null},
};

arr[3] = {
  options : {isRange: true, start: 250, end: 100, values: ['one', 'two', 'three', 4], isVertical: true, hasTagmark: false, color: 'red'},
  result : {isRange: true, isVertical: true, values: ['one', 'two', 'three', 4], color: 'red', hasTagmark: false, prefix: null},
};
arr[4] = {
  options : {start: 250, end: 100, scaleStep: 1000},
  result : {isRange: false, start: 0, end: 100, step: 1, hasTagmark: true, scaleStep: 100, color: '#53b6a8', isVertical: false, prefix: null},
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
