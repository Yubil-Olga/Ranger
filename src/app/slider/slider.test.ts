import Slider from './slider'
import Data from '../data'

describe("Number slider", () => {
    let options = {
        type: 1,
        direction: null,
        prefix: "$",
        start: 0,
        end: 100,
        step: 25,
        scalestep: 10,
        tagmark: true
    }
    let slider = new Slider(options).createSlider()

    test('Create number slider correctly', () => {
        expect(slider).toBeDefined()
        expect(slider.thumblers.length).toBe(1)
        expect(slider.tagmarks.length).toBe(1)
        expect(slider.container.className).toBe('slider')
    })
    test("Move thumbs", () => {
        let data = new Data(0, options)
        data.update('100', 100)
        slider.moveThumbs(data, 0)
        expect(slider.thumblers[0].style.left).toBe('100%')
    })
    test("Move bar", () => {
        let data1 = new Data(0, options)
        data1.update('80', 80)
        slider.moveBar([data1])
        expect(slider.barSelected.style.left).toBe("0%")
        expect(slider.barSelected.style.right).toBe("20%")
    })
    test('Update function', () => {
        slider.moveBar = jest.fn()
        slider.moveThumbs = jest.fn()
        let data = new Data(0, options)
        data.update('50', 50)
        slider.update([data])
        expect(slider.value.value).toBe('50')
        expect(slider.tagmarks[0].textContent).toBe('$ 50')
        expect(slider.moveBar).toBeCalledWith([data])
        expect(slider.moveThumbs).toBeCalled()
    })
    
})

describe("Value slider", () => {
    let options = {
        type: 2,
        direction: 'vertical',
        values: ["one", "two", "three"],
        color: 'red',
        tagmark: false,
        prefix: null
    }
    let slider = new Slider(options).createSlider()

    test('Create value slider correctly', () => {
        expect(slider).toBeDefined()
        expect(slider.thumblers.length).toBe(2)
        expect(slider.tagmarks.length).toBe(2)
        expect(slider.container.style.getPropertyValue('--active-color')).toBe('red')
        expect(slider.container.className).toBe('slider slider-vertical')
    })
    test("Move thumbs", () => {
        let data = new Data(0, options)
        data.update('two', 50)
        slider.moveThumbs(data, 0)
        expect(slider.thumblers[0].style.top).toBe('50%')
    })
    test("Move bar", () => {
        let data1 = new Data(0, options)
        let data2 = new Data(1, options)
        data1.update('two', 50)
        data2.update('three', 100)
        slider.moveBar([data1, data2])
        expect(slider.barSelected.style.top).toBe("50%")
        expect(slider.barSelected.style.bottom).toBe("0%")
    })
    test('Update function', () => {
        slider.moveBar = jest.fn()
        slider.moveThumbs = jest.fn()
        let data1 = new Data(0, options)
        let data2 = new Data(1, options)
        data1.update('two', 50)
        data2.update('three', 100)
        slider.update([data1, data2])
        expect(slider.value.value).toBe('two;three')
        expect(slider.tagmarks[0].textContent).toBe('two')
        expect(slider.tagmarks[1].textContent).toBe('three')
        expect(slider.moveBar).toBeCalledWith([data1, data2])
        expect(slider.moveThumbs).toBeCalled()
    })
})


