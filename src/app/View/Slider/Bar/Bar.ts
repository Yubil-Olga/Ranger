class Bar {
  public bar: HTMLElement
  public trackElement: HTMLElement

  constructor(trackElement: HTMLElement) {
    this.trackElement = trackElement;
    this.createTemplate();
  }

  public moveBar(data: {index: number, positionInPercents: number, isRange: boolean, isVertical: boolean}) {
    const {index, positionInPercents, isRange, isVertical } = data;

    if (isRange && index === 0) {
      this.moveBarFrom(positionInPercents, isVertical);
    } else {
      this.moveBarTo(positionInPercents, isVertical);
    }
  }

  private createTemplate() {
    this.bar = document.createElement('div');
    this.bar.className = 'perfect-slider__bar';
    this.trackElement.append(this.bar);
  }

  private moveBarFrom(positionInPercents: number, isVertical: boolean) {
    const barStart = positionInPercents + '%';

    if (isVertical) {
      this.bar.style.top = barStart;
    } else {
      this.bar.style.left = barStart;
    }
  }

  private moveBarTo(positionInPercents: number, isVertical: boolean) {
    const barEnd = 100 - positionInPercents + '%';
    if (isVertical) {
      this.bar.style.bottom = barEnd;
    } else {
      this.bar.style.right = barEnd;
    }
  }
}

export default Bar;