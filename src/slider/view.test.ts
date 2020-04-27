import Slider from './slider'
import View from './view'

describe("Single slider", () => {
    let view = new View()
    let div = document.createElement('div')
    let options = {
        type: 1,
        start: 0,
        end: 200,
        step: 10
    }
    view.createSlider(div, options)

    test("Update tagmark value", () => {
        view.update([{coord: 10, value: 20}])
        expect(view.slider._tagmarks[0].textContent).toBe("20")
    })

    test("Move thumbs", () => {
        view.moveThumbs([{coord: 10, value: 20}], 0)
        expect(view.slider._thumblers[0].style.left).toBe('10%')
    })
    test("Move bar", () => {
        view.moveBar([{coord: 90, value: 180}])
        expect(view.slider._barSelected.style.left).toBe("0%")
        expect(view.slider._barSelected.style.right).toBe("10%")
    })
})
describe("Double slider", () => {
    let view = new View()
    let div = document.createElement('div')
    let options = {
        type: 2,
        values: ["one", "two", "three", "four", "five"],
        direction: 'vertical'
    }
    view.createSlider(div, options)
    test("Move bar", () => {
        view.moveBar([{coord: 20, value: "two"}, {coord: 100, value: "five"}])
        expect(view.slider._barSelected.style.top).toBe("20%")
        expect(view.slider._barSelected.style.bottom).toBe("0%")
    })
    test("Move thumbs", () => {
        view.moveThumbs([{coord: 20, value: "two"}, {coord: 80, value: "four"}], 1)
        expect(view.slider._thumblers[1].style.top).toBe('80%')
    })
    test("Click event", () => {
        
        expect(2+2).toBe(4)
    })
})
