import Model from '../Model/Model';
import View from '../View/View';
import Presenter from './Presenter';

describe('Creation of presenter', () => {
  const div = document.createElement('div');
  const options = {
    isRange: false,
    isVertical: false,
    start: -25,
    end: 100,
    step: 25,
    hasTagmark: true,
    prefix: null
  };
  const model = new Model(options);
  const presenter = new Presenter(div, model);
  const view = new View(model.getOptions(), div);
  model.init();

  test('Call model', () => {
    model.valueCalculation = jest.fn();
    presenter.callModel(100, 260, 0);
    expect(model.valueCalculation).toBeCalled();
    expect(model.valueCalculation).toBeCalledWith(100, 260, 0);
  });

  test('Model changed', () => {
    presenter.updateViewData = jest.fn();
    model.modelChanged.notify([{value: '20', coord: 20}]);
    expect(presenter.updateViewData).toBeCalled();
    expect(presenter.updateViewData).toBeCalledWith([{value: '20', coord: 20}]);
  });

  test('Options changed', () => {
    const newOptions = {
      isRange: true,
      isVertical: true,
      start: 0,
      end: 100,
      step: 50,
      hasTagmark: false,
      prefix: null,
      color: null,
      scalestep: 100,
    };
    presenter.updateViewOptions = jest.fn();
    model.optionsChanged.notify(newOptions);
    expect(presenter.updateViewOptions).toBeCalled();
    expect(presenter.updateViewOptions).toBeCalledWith(newOptions);
  });
});