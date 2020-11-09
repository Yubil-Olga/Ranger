export default class Tagmark {
  public handleElement: HTMLElement
  public tagmark: HTMLElement

  constructor(handleElement: HTMLElement, hasTagmark: boolean) {
    this.handleElement = handleElement;
    this.createTemplate(hasTagmark);
  }

  private createTemplate(hasTagmark: boolean) {
    this.tagmark = document.createElement('div');
    this.tagmark.className = hasTagmark ? 'perfect-slider__tagmark' : 'perfect-slider__tagmark_hidden';
    this.handleElement.append(this.tagmark);
  }

  public setTextContent(text: string) {
    this.tagmark.textContent = text;
  }
}