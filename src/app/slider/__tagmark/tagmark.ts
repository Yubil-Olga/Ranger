export default class Tagmark {
  private _tagmark: HTMLElement
  constructor(isVisible: boolean) {
    this._tagmark = document.createElement('span');
    this._tagmark.className = isVisible ? 'tag__mark' : 'tag__mark_hide';
  }
  get tagmark(): HTMLElement {
    return this._tagmark;
  }
}