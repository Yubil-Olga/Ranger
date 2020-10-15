import Data from './Data';

describe('Initial values and coords for double slider', () => {
  const options = {
    isRange: true,
    isVertical: false,
    hasTagmark: true,
    prefix: null,
    start: 0,
    end: 200,
    step: 10
  };
  const data = new Data(1, options);
  test('Calculate coord', () => {
    expect(data.value).toBe('100');
    expect(data.coord).toBe(50);
  });
});