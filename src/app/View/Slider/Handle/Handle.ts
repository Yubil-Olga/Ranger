import Tagmark from '../Tagmark/Tagmark';

export default class Handle {
  public handle: HTMLElement
  public tagmark: Tagmark
  private trackElement: HTMLElement
  private currentPositionInPercents: number

  constructor(trackElement: HTMLElement, hasTagmark: boolean) {
    this.trackElement = trackElement;
    this.createTemplate();
    this.tagmark = new Tagmark(this.handle, hasTagmark);
  }

  private createTemplate(): void {
    this.handle = document.createElement('div');
    this.handle.className = 'perfect-slider__handle';
    this.trackElement.append(this.handle);
  }

  public getCurrentPosition() {
    return this.currentPositionInPercents;
  }

  public moveHandle( positionInPercents: number, isVertical: boolean ) {
    this.currentPositionInPercents = positionInPercents;

    const widthInPercents = (this.handle.clientWidth/this.trackElement.clientWidth) * 100;
    const heightInPercents = (this.handle.clientHeight/this.trackElement.clientHeight) * 100;

    if (isVertical) {
      this.handle.style.top = (positionInPercents - heightInPercents/2) + '%';
    } else {
      this.handle.style.left = (positionInPercents - widthInPercents/2) + '%';
    }
  }

  updateHandlePosition(data: {positionInPercents: number, isVertical: boolean, tagmark: string}) {
    const { positionInPercents, isVertical, tagmark } = data;
    this.moveHandle(positionInPercents, isVertical);
    this.tagmark.setTextContent(tagmark);
  }
}