import Tagmark from './Tagmark';

const handle = document.createElement('div');
handle.className = 'perfect-slider__handle';

describe('Tagmark', () => {
  const tagmark = new Tagmark(handle);

  test('Tagmark is created', () => {
    expect(tagmark.tagmark.tagName).toBe('DIV');
    expect(tagmark.tagmark.className).toBe('perfect-slider__tagmark');
  });

  test('Set text content', () => {
    tagmark.setTextContent('spring');
    expect(tagmark.tagmark.textContent).toBe('spring');
  });
});
