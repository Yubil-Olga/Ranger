import Model from './model'

let x = new Model()
let options = {
    start: -25,
    end: 100,
    step: 25
}
x.init(options)

test('Step calculation return size of one step in %', ( ) => {
    expect(x.stepCalculation()).toBe(20)
})
test('Position calculation return correct position in %', ( ) => {
    expect(x.positionCalculation(100, 25, 400)).toBe(25)
    expect(x.positionCalculation(100, 30, 400)).toBe(30)
    expect(x.positionCalculation(200, 10, 400)).toBe(50)
})
test('Selected value', ( ) => {
    expect(x.valueCalculation(0, 200)).toBe(-25)
    expect(x.valueCalculation(25, 125)).toBe(0)
    expect(x.valueCalculation(300, 300)).toBe(100)
})
