import Model from './model'
import View from './view'
import Presenter from './presenter'

describe("Creation of presenter", () => {
    let options = {
        type: 1,
        direction: null,
        start: -25,
        end: 100,
        step: 25,
        tagmark: true,
        prefix: null
    }
    let model = new Model(options)
    let view = new View(options)
    let presenter = new Presenter(model, view)
    test("Call model", () => {
        model.valueCalculation = jest.fn()
        presenter.callModel(100, 260, 0)
        expect(model.valueCalculation).toBeCalled()
        expect(model.valueCalculation).toBeCalledWith(100, 260, 0)
    })
    test("View changed", () => {
        presenter.callModel = jest.fn()
        view.inputChanged.notify({trackWidth: 260, position: 50, index: 0})
        expect(presenter.callModel).toBeCalled()
    })
    test("Model changed", () => {
        view.slider.update = jest.fn()
        model.modelChanged.notify([{_value: '20', _coord: 20}])
        expect(view.slider.update).toBeCalled()
        expect(view.slider.update).toBeCalledWith([{_value: '20', _coord: 20}])
    })
})

