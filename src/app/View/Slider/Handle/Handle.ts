import Tagmark from '../Tagmark/Tagmark';

export default class Handle {
  public handle: HTMLElement
  public tagmark: Tagmark
  private trackElement: HTMLElement
  private currentPositionInPercents: number

  constructor(trackElement: HTMLElement, hasTagmark: boolean) {
    this.trackElement = trackElement;
    this.createTemplate();
    this.tagmark = hasTagmark ? new Tagmark(this.handle) : null;
  }

  private createTemplate(): void {
    this.handle = document.createElement('div');
    this.handle.className = 'perfect-slider__handle';
    this.trackElement.append(this.handle);
  }

  public getCurrentPosition() {
    return this.currentPositionInPercents;
  }

  public moveHandle( data: {positionInPercents: number, isVertical: boolean} ) {
    const { positionInPercents, isVertical } = data;

    this.currentPositionInPercents = positionInPercents;

    const widthInPercents = (this.handle.clientWidth / this.trackElement.clientWidth) * 100;
    const heightInPercents = (this.handle.clientHeight / this.trackElement.clientHeight) * 100;

    if (isVertical) {
      this.handle.style.top = `${positionInPercents - heightInPercents / 2}%`;
    } else {
      this.handle.style.left = `${positionInPercents - widthInPercents / 2}%`;
    }
  }

  updateTagmarkValue(value: string) {
    this.tagmark.setTextContent(value);
  }
}