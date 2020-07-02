import { CreateOptions } from './options'

const arr = []

arr[0] = {
    options : {start: -25, end: 100, step: 25, scalestep: 10, prefix: "%", color: "frd"},
    result : {_type: 1, _direction: null, _start: -25, _end: 100, _step: 25, _scalestep: 10, _tagmark: true, _prefix: "%", _color: null},  
}

arr[1] = {
    options : {start: 250, end: 100, step: 300, scalestep: 1000},
    result : {_type: 1, _start: 0, _end: 100, _step: 100, _tagmark: true, _scalestep: 100, _color: null, _direction: null, _prefix: null},  
}

arr[2] = {
    options : {type: 'double', start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical'},
    result : {_type: 2, _direction: 'vertical', _values: ["one", "two", "three"], _tagmark: true, _color: null, _prefix: null},  
}

arr[3] = {
    options : {type: 'double',start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical', tagmark: false, color: "red"},
    result : {_type: 2, _direction: 'vertical', _values: ["one", "two", "three"], _color: "red", _tagmark: false, _prefix: null},  
}
arr[4] = {
    options : {start: 250, end: 100, scalestep: 1000},
    result : {_type: 1, _start: 0, _end: 100, _step: 1, _tagmark: true, _scalestep: 100, _color: null, _direction: null, _prefix: null},  
}

test('Set correct options', ( ) => {
  for (let i=0; i<arr.length; i++) {
      let param = new CreateOptions(arr[i].options).create() 
      expect(param).toMatchObject(arr[i].result)
      expect(param.type).toBe(arr[i].result._type)
      expect(param.direction).toBe(arr[i].result._direction)
      expect(param.tagmark).toBe(arr[i].result._tagmark)
      expect(param.color).toBe(arr[i].result._color)
      expect(param.prefix).toBe(arr[i].result._prefix)
      if ('step' in param) {
          expect(param.step).toBe(arr[i].result._step)
          expect(param.scalestep).toBe(arr[i].result._scalestep)  
      }
      if ('values' in param) {
          expect(param.values).toEqual(arr[i].result._values)
      }
      
  }
})

