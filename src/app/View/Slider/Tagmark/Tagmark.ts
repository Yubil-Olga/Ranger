export default class Tagmark {
  public handleElement: HTMLElement
  public tagmark: HTMLElement

  constructor(handleElement: HTMLElement) {
    this.handleElement = handleElement;
    this.createTemplate();
  }

  private createTemplate() {
    this.tagmark = document.createElement('div');
    this.tagmark.className = 'perfect-slider__tagmark';
    this.handleElement.append(this.tagmark);
  }

  public setTextContent(text: string) {
    this.tagmark.textContent = text;
  }
}