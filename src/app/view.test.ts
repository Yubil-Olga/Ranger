import Slider from './slider/slider'
import View from './view'

// let div = document.createElement('div')
// let options = []
// options[0] = {type: 1, direction: null, tagmark: true, start: 0, end: 200, step: 10, prefix: null}
// options[1] = {type: 2, direction: null,  tagmark: true, values: ["one", "two", "three", "four", "five"], prefix: null}
// options[2] = {type: 2, direction: 'vertical', tagmark: true, values: ["one", "two", "three", "four", "five"],  prefix: null}
// let views = []
// options.forEach(el => {
//     let view = new View(el).appendSlider(div)
//     view.slider.thumblers[0].style.top = "5%"
//     view.slider.thumblers[0].style.left = "5%"
//     views.push(view)
// })
// test('Selected thumbler', () => {
//     expect(views[0].selectedThumb(100, 120, views[0].slider.thumblers)).toBe(0)
// })

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
    test ('Mousedown event', () => {
        const spy = jest.spyOn(view, 'startSelect')
        let mousedown = new MouseEvent('mousedown')
        Object.defineProperty(mousedown, 'target', {
            value: {className: 'thumb__marker'}
        })
        view.onMouseDown(mousedown)
        expect(spy).toBeCalled()
    })
    test ('Mousemove', () => {
        const spy = jest.spyOn(view, 'mousemove')
        view.startSelect()
        let mousemove = new MouseEvent('mousemove')
        document.dispatchEvent(mousemove)
        expect(spy).toBeCalled()
    })
    test ('End select', () => {
        const spy = jest.spyOn(view, 'mousemove')
        const spy2 = jest.spyOn(view, 'mouseup')
        spy.mockClear()
        spy2.mockClear()
        view.endSelect()
        let mousemove = new MouseEvent('mousemove')
        let mouseup = new MouseEvent('mouseup')
        document.dispatchEvent(mousemove)
        document.dispatchEvent(mouseup)
    
        expect(spy).not.toBeCalled()
        expect(spy2).not.toBeCalled()
    })
    // test('Drag event return false', () => {
    //     let drag = new MouseEvent('dragstart')
    //     view.slider.track.dispatchEvent(drag)

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
        
        const spy = jest.spyOn(view, 'callCommand')
        view.onSelect(smth)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(260, 90, 0)
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
describe("One more slider", () => {
    let div = document.createElement('div')
    let options = {
        type: 2,
        values: ["one", "two", "three", "four", "five"],
        direction: null,
        tagmark: true,
        prefix: null
    }
    let view = new View(options).appendSlider(div)
    
    test ("Selected thumbler", () => {
        view.slider.thumblers[0].style.left = "5%"
        view.slider.thumblers[1].style.left = "80%"
        expect(view.selectedThumb(100, 120, view.slider.thumblers)).toBe(1)
    })
    test('Call comand', () => {
        view.inputChanged.notify = jest.fn()
        view.callCommand(261, 100, 0)
        expect(view.inputChanged.notify).toBeCalledWith({trackWidth: 261, position: 100, index: 0})
    })
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
        expect(view.slider.container.style.getPropertyValue('--transition')).toBe('0.5s')
    })
    test ("Click event: coord more then width of the element", () => {   
        let smth = new MouseEvent('click', {
            clientX: 350
        })
        Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
        view.callCommand = jest.fn()
        view.onSelect(smth)
        expect(view.callCommand).toBeCalled()
        expect(view.callCommand).toBeCalledWith(260, 260, 1)
    })
    test ("Click event: coord less then 0", () => {   
        let smth = new MouseEvent('click', {
            clientX: 10
        })
        Object.defineProperty(view.slider.track, 'clientWidth', {value: 260});
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

