import Slider from './slider/slider'
import View from './view'

// describe("Single slider", () => {
    
//     let div = document.createElement('div')
//     let options = {
//         type: 1,
//         start: 0,
//         end: 200,
//         step: 10
//     }
//     let view = new View()
//     view.createSlider(div, options)
    
//     test ("Selected thumbler", () => {
//         view.slider._thumblers[0].style.top = "5%"
//         expect(view.selectedThumb(100, 120, view.slider._thumblers)).toBe(0)
//     })
//     // test("Update tagmark value", () => {
//     //     view.update([{ value: 20, coord: 10}])
//     //     expect(view.slider._tagmarks[0].textContent).toBe("20")
//     // })

//     // test("Move thumbs", () => {
//     //     view.moveThumbs([{coord: 10, value: 20}], 0)
//     //     expect(view.slider._thumblers[0].style.left).toBe('10%')
//     // })
//     // test("Move bar", () => {
//     //     view.moveBar([{coord: 90, value: 180}])
//     //     expect(view.slider._barSelected.style.left).toBe("0%")
//     //     expect(view.slider._barSelected.style.right).toBe("10%")
//     // })
// })
// describe("Double slider", () => {
//     let div = document.createElement('div')
//     let options = {
//         type: 2,
//         values: ["one", "two", "three", "four", "five"],
//         direction: 'vertical'
//     }
//     let view = new View()
//     view.createSlider(div, options)
//     test("Move bar", () => {
//         view.moveBar([{coord: 20, value: "two"}, {coord: 100, value: "five"}])
//         expect(view.slider._barSelected.style.top).toBe("20%")
//         expect(view.slider._barSelected.style.bottom).toBe("0%")
//     })
//     test("Move thumbs", () => {
//         view.moveThumbs([{coord: 20, value: "two"}, {coord: 80, value: "four"}], 1)
//         expect(view.slider._thumblers[1].style.top).toBe('80%')
//     })
    
//     test ("Selected thumbler", () => {
//         view.slider._thumblers[0].style.top = "5%"
//         view.slider._thumblers[1].style.top = "80%"
//         expect(view.selectedThumb(100, 120, view.slider._thumblers)).toBe(1)
//     })
//     test ("Click event", () => {   
//         let smth = new MouseEvent('click', {
//             clientY: 100
//         })
//         view.callCommand = jest.fn()
//         view.onSelect(smth)
//         expect(view.callCommand).toBeCalled()
//         expect(view.callCommand).toBeCalledWith(0, 0, 0)
//     })
//     test ("OnMouseDown", () => {
//         let smth = new MouseEvent('mousedown')
//         // view.slider._track.addEventListener(smth, view.onMouseDown)
//         view.slider._thumblers[0].dispatchEvent(smth)
//         view.onSelect = jest.fn()
//         expect(view.onSelect).toBeCalled()
//     })
// })

// describe("Double slider", () => {
//     let div = document.createElement('div')
//     let options = {
//         type: 2,
//         values: ["one", "two", "three", "four", "five"]
//     }
//     let view = new View()
//     view.createSlider(div, options)
    
//     test ("Selected thumbler", () => {
//         view.slider._thumblers[0].style.left = "50%"
//         view.slider._thumblers[1].style.left = "80%"
//         expect(view.selectedThumb(10, 120, view.slider._thumblers)).toBe(0)
//     })
// })
