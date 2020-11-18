import Bar from './Bar';

const trackElement = document.createElement('div');
trackElement.className = 'perfect-slider__track';
const bar = new Bar(trackElement);

describe('Bar', () => {
  test('Bar is created', () => {
    expect(bar.bar.tagName).toBe('DIV');
    expect(bar.bar.className).toBe('perfect-slider__bar');
  });

  test('Vertical slider with range: move bar from', () => {
    bar.moveBar({index: 0, positionInPercents: 10, isRange: true, isVertical: true});
    expect(bar.bar.style.top).toBe('10%');
  });

  test('Vertical slider with range:move bar to', () => {
    bar.moveBar({index: 1, positionInPercents: 80, isRange: true, isVertical: true});
    expect(bar.bar.style.bottom).toBe('20%');
  });

  test('Horisontal slider without range: move bar to', () => {
    bar.moveBar({index: 0, positionInPercents: 70, isRange: false, isVertical: false});
    expect(bar.bar.style.right).toBe('30%');
  });

  test('Horisontal slider with range: move bar from', () => {
    bar.moveBar({index: 0, positionInPercents: 10, isRange: true, isVertical: false});
    expect(bar.bar.style.left).toBe('10%');
  });
});
