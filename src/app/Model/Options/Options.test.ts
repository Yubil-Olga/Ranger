import CreateOptions from './CreateOptions';

const arr = [];

arr[0] = {
  options : {start: -25, end: 100, step: 25, scalestep: 10, prefix: '%', color: 'frd'},
  result : {type: 1, direction: null, start: -25, end: 100, step: 25, scalestep: 10, hasTagmark: true, prefix: '%', color: null},
};

arr[1] = {
  options : {start: 250, end: 100, step: 300, scalestep: 1000},
  result : {type: 1, start: 0, end: 100, step: 100, hasTagmark: true, scalestep: 100, color: null, direction: null, prefix: null},
};

arr[2] = {
  options : {type: 'double', start: 250, end: 100, values: ['one', 'two', 'three', 4], direction: 'vertical'},
  result : {type: 2, direction: 'vertical', values: ['one', 'two', 'three'], hasTagmark: true, color: null, prefix: null},
};

arr[3] = {
  options : {type: 'double', start: 250, end: 100, values: ['one', 'two', 'three', 4], direction: 'vertical', hasTagmark: false, color: 'red'},
  result : {type: 2, direction: 'vertical', values: ['one', 'two', 'three'], color: 'red', hasTagmark: false, prefix: null},
};
arr[4] = {
  options : {start: 250, end: 100, scalestep: 1000},
  result : {type: 1, start: 0, end: 100, step: 1, hasTagmark: true, scalestep: 100, color: null, direction: null, prefix: null},
};

test('Set correct options', ( ) => {
  for (let i=0; i<arr.length; i++) {
    let param = CreateOptions.create(arr[i].options);
    expect(param).toMatchObject(arr[i].result);
    expect(param.type).toBe(arr[i].result.type);
    expect(param.direction).toBe(arr[i].result.direction);
    expect(param.hasTagmark).toBe(arr[i].result.hasTagmark);
    expect(param.color).toBe(arr[i].result.color);
    expect(param.prefix).toBe(arr[i].result.prefix);
    if ('step' in param) {
      expect(param.step).toBe(arr[i].result.step);
      expect(param.scalestep).toBe(arr[i].result.scalestep);
    }
    if ('values' in param) {
      expect(param.values).toEqual(arr[i].result.values);
    }
  }
});

