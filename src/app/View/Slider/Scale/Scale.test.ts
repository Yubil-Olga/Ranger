import Scale from './Scale';

const arr = [];
arr[0] = {type: 1, direction: null, prefix: '$', start: 0, end: 100, step: 25, scaleStep: 10, hasTagmark: true};
arr[1] = {type: 2, direction: 'vertical', prefix: null, start: -3, end: 100, step: 1, scaleStep: 10, hasTagmark: true};

describe('Create correct scale of slider', () => {
  test('Number of marks in first slider', () => {
    const scale = new Scale(arr[0]);
    const labelMarks = scale.getElement().querySelectorAll('.slider__label-mark');
    expect(labelMarks.length).toBe(11);
  });

  test('Number of marks in second slider', () => {
    const scale = new Scale(arr[1]);
    const labelMarks = scale.getElement().querySelectorAll('.slider__label-mark');
    expect(labelMarks.length).toBe(12);
  });

  test('Position of first mark', () => {
    const scale = new Scale(arr[1]);
    const marks = scale.getElement().querySelectorAll('.slider__label-mark');
    expect(marks[0].getAttribute('data-text')).toBe('-3');
    expect((<HTMLElement>marks[0]).style.left).toBe('');
  });

  test('Position of last mark', () => {
    const scale = new Scale(arr[1]);
    const marks = scale.getElement().querySelectorAll('.slider__label-mark');
    expect(marks[marks.length - 1].getAttribute('data-text')).toBe('100');
    expect((<HTMLElement>marks[marks.length - 1]).style.top).toBe('100%');
  });
});