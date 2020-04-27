import Slider from './slider'

describe("Number slider", () => {
    let ranger = new Slider()
    let options = {
        type: 1,
        start: 0,
        end: 100,
        step: 25,
        scalestep: 10
    }
    ranger.createSlider(options)

    test('Create number slider with correctly', () => {
        expect(ranger).toBeDefined()
        expect(ranger._thumblers.length).toBe(1)
        expect(ranger._tagmarks.length).toBe(1)
        expect(ranger._tag.style.display).not.toContainEqual('none')
    })
})

describe("Value slider", () => {
    let ranger = new Slider()
    let options = {
        type: 2,
        direction: 'vertical',
        values: ["one", "two", "three"],
        color: 'red',
        tagmark: false
    }
    ranger.createSlider(options)

    test('Create value slider with correctly', () => {
        expect(ranger).toBeDefined()
        expect(ranger._thumblers.length).toBe(2)
        expect(ranger._tagmarks.length).toBe(2)
        expect(ranger._container.style.getPropertyValue('--active-color')).toBe('red')
        expect(ranger._tag.style.display).toBe('none')
    })
})

