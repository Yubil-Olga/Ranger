import Model from '../Model/Model';
import View from '../View/View';
import Presenter from './Presenter';

describe('Creation of presenter', () => {
  const div = document.createElement('div');
  const options = {
    type: 1,
    direction: null,
    start: -25,
    end: 100,
    step: 25,
    hasTagmark: true,
    prefix: null
  };
  const model = new Model(options);
  const view = new View(options, div);
  const presenter = new Presenter(model, view);

  test('Call model', () => {
    model.valueCalculation = jest.fn();
    presenter.callModel(100, 260, 0);
    expect(model.valueCalculation).toBeCalled();
    expect(model.valueCalculation).toBeCalledWith(100, 260, 0);
  });
  test('View changed', () => {
    presenter.callModel = jest.fn();
    view.inputChanged.notify({trackWidth: 260, position: 50, index: 0});
    expect(presenter.callModel).toBeCalled();
  });
  test('Model changed', () => {
    view.slider.update = jest.fn();
    model.modelChanged.notify([{_value: '20', _coord: 20}]);
    expect(view.slider.update).toBeCalled();
    expect(view.slider.update).toBeCalledWith([{_value: '20', _coord: 20}]);
  });
});

