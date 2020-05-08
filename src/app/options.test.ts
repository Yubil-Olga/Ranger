import { Options } from './options'

let arr = []

arr[0] = {
    options : {start: -25, end: 100, step: 25, scalestep: 10, prefix: "%"},
    result : {_type: 1, _direction: null, _start: -25, _end: 100, _step: 25, _scalestep: 10, _tagmark: true, _prefix: "%", _color: null},  
}

arr[1] = {
    options : {start: 250, end: 100, step: 30, scalestep: 1000},
    result : {_type: 1, _start: 0, _end: 100, _step: 30, _tagmark: true, _scalestep: 100, _color: null, _direction: null},  
}

arr[2] = {
    options : {type: 'double', start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical'},
    result : {_type: 2, _direction: 'vertical', _values: ["one", "two", "three"], _tagmark: true},  
}

arr[3] = {
    options : {type: 'double',start: 250, end: 100, values: ["one", "two", "three", 4], direction: 'vertical', tagmark: false, color: "red"},
    result : {_type: 2, _direction: 'vertical', _values: ["one", "two", "three"], _color: "red", _tagmark: false},  
}

test('Set correct options', ( ) => {
    for (let i=0; i<arr.length; i++) {
        let param = new Options(arr[i].options).create() 
        expect(param).toMatchObject(arr[i].result)
    }
})


