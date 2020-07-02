import Scale from './scale'

const scale = new Scale()
const arr = []
arr[0] = {type: 1, direction: null, prefix: "$", start: 0, end: 100, step: 25, scalestep: 10, tagmark: true}
arr[1] = {type: 2, direction: 'vertical', prefix: null, start: -3, end: 100, step: 1, scalestep: 10, tagmark: true}



describe('Create correct scale of slider', () => {
    test('Number of marks in first slider', () => {
        const spy = spyOn(scale, 'addMark')
        scale.addScale(arr[0])
        expect(spy).toBeCalled()
        expect(spy).toBeCalledTimes(11)
    })
    test('Number of marks in second slider', () => {
        const spy = spyOn(scale, 'addMark')
        scale.addScale(arr[1])
        expect(spy).toBeCalled()
        expect(spy).toBeCalledTimes(12)
    })
    test('Position of first mark', () => {
        scale.addScale(arr[1])
        const marks = scale.scale.querySelectorAll('.label__mark')
        expect(marks[0].getAttribute('data-text')).toBe('-3')
        expect((<HTMLElement>marks[0]).style.left).toBe('')
    })
    test('Position of last mark', () => {
        scale.addScale(arr[1])
        const marks = scale.scale.querySelectorAll('.label__mark')
        expect(marks[marks.length - 1].getAttribute('data-text')).toBe('100')
        expect((<HTMLElement>marks[marks.length - 1]).style.top).toBe('100%')
    })
})