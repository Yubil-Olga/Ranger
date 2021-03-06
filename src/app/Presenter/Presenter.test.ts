import Model from '../Model/Model';
import Presenter from './Presenter';
window.CSS = { escape: jest.fn(), supports: jest.fn()};

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
  model.init();

  test('Update model', () => {
    model.updateModel = jest.fn();
    presenter.updateModel({ positionInPercents: 100, index: 0 });
    expect(model.updateModel).toBeCalled();
    expect(model.updateModel).toBeCalledWith({ positionInPercents: 100, index: 0 });
  });

  test('Model changed', () => {
    presenter.updateViewData = jest.fn();
    model.modelChanged.notify([{value: '20', coordinate: 20}]);
    expect(presenter.updateViewData).toBeCalled();
    expect(presenter.updateViewData).toBeCalledWith([{value: '20', coordinate: 20}]);
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
      scaleStep: 100,
    };
    presenter.updateViewOptions = jest.fn();
    model.optionsChanged.notify(newOptions);
    expect(presenter.updateViewOptions).toBeCalled();
    expect(presenter.updateViewOptions).toBeCalledWith(newOptions);
  });
});
