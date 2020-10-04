export default class Tagmark {
  private tagmark: HTMLElement

  constructor(isVisible: boolean) {
    this.tagmark = document.createElement('span');
    this.tagmark.className = isVisible ? 'tag__mark' : 'tag__mark_hide';
  }

  public getElement() {
    return this.tagmark;
  }
}