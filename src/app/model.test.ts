import Model from './model'

// describe('Number model', () => {
//     let options = {
//         type: 1,
//         start: -25,
//         end: 100,
//         step: 25
//     }
//     let x = new Model()
//     x.init(options)
    
//     test('Step calculation return size of one step in %', ( ) => {
//         expect(x.stepCalculation()).toBe(20)
//     })
//     test('Position calculation return correct position in %', ( ) => {
//         expect(x.positionCalculation(100, 25, 400)).toBe(25)
//         expect(x.positionCalculation(100, 30, 400)).toBe(30)
//         expect(x.positionCalculation(200, 10, 400)).toBe(50)
//     })
//     test('Selected number value', ( ) => {
//         expect(x.valueCalculation(0, 200, 0)).toMatchObject([{"coord": 0, "value": -25}])
//         expect(x.valueCalculation(25, 125, 0)).toMatchObject([{"coord": 20, "value": 0}])
//         expect(x.valueCalculation(300, 300, 0)).toMatchObject([{"coord": 100, "value": 100}])
//     })  
// })

// describe('Value model', () => {
//     let options = {
//         type: 1,
//         values: ["one", "two", "three"]
//     }
//     let x = new Model()
//     x.init(options)
//     test ('Selected value', () => {
//         expect(x.valueCalculation(0, 200, 0)).toMatchObject([{"coord": 0, "value": "one"}])
//         expect(x.valueCalculation(100, 200, 0)).toMatchObject([{"coord": 50, "value": "two"}])
//     })
// })
