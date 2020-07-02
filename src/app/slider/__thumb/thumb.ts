export default class Thumb {
    private _thumb: HTMLElement
    constructor() {
        this._thumb = document.createElement('div')
        this._thumb.className = 'slider__thumb'
    }
    createThumb(): HTMLElement {
        const thumbmark = document.createElement('span');
        thumbmark.className = 'thumb__marker';
        this._thumb.append(thumbmark);
        return this._thumb;
    }
}