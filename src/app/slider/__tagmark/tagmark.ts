export default class Tagmark {
    private _tagmark: HTMLElement
    constructor() {
        this._tagmark = document.createElement('span');
        this._tagmark.className = 'tag__mark';
    }
    get tagmark() {
        return this._tagmark
    }
}