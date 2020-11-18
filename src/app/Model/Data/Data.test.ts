import Data from './Data';

describe('Data for number slider', () => {
  const options = {
    start: 0,
    end: 200,
  };
  const data = new Data(1, options, 100);

  test('Calculate position in percents', () => {
    expect(data.positionInPercents).toBe(50);
  });
});

describe('Data for value slider', () => {
  const options = {
    values: ['one', 'two', 'three']
  };

  const data = new Data(0, options, 'two');

  test('Calculate position in percents', () => {
    expect(data.positionInPercents).toBe(50);
  });

  test('Update data', () => {
    data.update('three', 100);
    expect(data.value).toBe('three');
    expect(data.positionInPercents).toBe(100);
  });
});
