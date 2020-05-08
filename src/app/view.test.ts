import Slider from './slider/slider'
import View from './view'

describe("Single slider", () => {
    let div = document.createElement('div')
    let options = {
        type: 1,
        direction: null,
        tagmark: true,
        prefix: null,
        start: 0,
        end: 200,
        step: 10
    }
    let view = new View(options).appendSlider(div)
    
    test ("Selected thumbler", () => {
        view.slider.thumblers[0].style.top = "5%"
        expect(view.selectedThumb(100, 120, view.slider.thumblers)).toBe(0)
    })
    // test ('Mousedown event', () => {
    //     let mousedown = new MouseEvent('onmousedown')
    //     Object.defineProperty(mousedown, 'target', { value: {
    //         className: 'thumb__marker'
    //     }})
    //     const onselect = jest.fn(view.onSelect)
    //     // let marker = view.slider.container.querySelector('.thumb__marker')
    //     view.onMouseDown(mousedown)
    //     expect(onselect.mock.calls).toBe(1)
    // })
    test ("Click event", () => {   
        let smth = new MouseEvent('click', {
            clientX: 100
        })
        Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
        Object.defineProperty(view.slider.track, 'getBoundingClientRect', {
            value: function() {
                return { bottom: 0, height: 0, left: 10, right: 0, top: 50 }
            }
        });
        view.callCommand = jest.fn()
        view.onSelect(smth)
        expect(view.callCommand).toBeCalled()
        expect(view.callCommand).toBeCalledWith(260, 90, 0)
    })
    
})
describe("Double slider", () => {
    let div = document.createElement('div')
    let options = {
        type: 2,
        values: ["one", "two", "three", "four", "five"],
        direction: 'vertical',
        tagmark: true,
        prefix: null
    }
    let view = new View(options).appendSlider(div)
    
    test ("Selected thumbler", () => {
        view.slider.thumblers[0].style.top = "5%"
        view.slider.thumblers[1].style.top = "80%"
        expect(view.selectedThumb(100, 120, view.slider.thumblers)).toBe(1)
    })
    test('Call comand', () => {
        view.inputChanged.notify = jest.fn()
        view.callCommand(261, 100, 0)
        expect(view.inputChanged.notify).toBeCalledWith({trackWidth: 261, position: 100, index: 0})
    })
    test ("Click event", () => {   
        let smth = new MouseEvent('click', {
            clientY: 100
        })
        Object.defineProperty(view.slider.track, 'clientHeight', {value: 260});
        Object.defineProperty(view.slider.track, 'getBoundingClientRect', {
            value: function() {
                return { bottom: 0, height: 0, left: 10, right: 0, top: 50 }
            }
        });
        view.callCommand = jest.fn()
        view.onSelect(smth)
        expect(view.callCommand).toBeCalled()
        expect(view.callCommand).toBeCalledWith(260, 50, 0)
        expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0.5s')
    })
    test ("Click event: coord more then width of the element", () => {   
        let smth = new MouseEvent('click', {
            clientY: 350
        })
        Object.defineProperty(view.slider.track, 'clientHeight', {value: 260});
        view.callCommand = jest.fn()
        view.onSelect(smth)
        expect(view.callCommand).toBeCalled()
        expect(view.callCommand).toBeCalledWith(260, 260, 1)
    })
    test ("Click event: coord less then 0", () => {   
        let smth = new MouseEvent('click', {
            clientY: 10
        })
        Object.defineProperty(view.slider.track, 'clientHeight', {value: 260});
        view.callCommand = jest.fn()
        view.onSelect(smth)
        expect(view.callCommand).toBeCalled()
        expect(view.callCommand).toBeCalledWith(260, 0, 0)
    })
    test("Transition duration", () => {
        let mousedown = new MouseEvent('mousedown')
        view.transitionDuration(mousedown)
        expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0')
    })
    
})


