import Scale from './Scale';

const div = document.createElement('div');

describe('Create correct scale of slider', () => {
  test('Number of marks in the scale', () => {
    const scale = new Scale(div, { start: 0, end: 100, scaleStep: 10, });
    const labelMarks = scale.scale.querySelectorAll('.perfect-slider__scale-mark');
    expect(labelMarks.length).toBe(11);
  });

  test('Position of first mark', () => {
    const scale = new Scale(div, { start: -3, end: 100, scaleStep: 10, });
    const labelMarks = scale.scale.querySelectorAll('.perfect-slider__scale-mark');

    expect(labelMarks[0].getAttribute('data-text')).toBe('-3');
    expect((<HTMLElement>labelMarks[0]).style.left).toBe('0%');
  });

  test('Position of last mark', () => {
    const scale = new Scale(div, { start: -3, end: 100, scaleStep: 10, isVertical: true, });
    const marks = scale.scale.querySelectorAll('.perfect-slider__scale-mark');
    expect(marks[marks.length - 1].getAttribute('data-text')).toBe('100');
    expect((<HTMLElement>marks[marks.length - 1]).style.top).toBe('100%');
  });
});
