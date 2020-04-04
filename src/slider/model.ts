import eventDispatcher from './dispatcher'

export default class Model {
    private _start: number
    private _end: number
    private _currentValue: number
    private _modelChanged: any
    constructor() {
      this._start = 0
      this._end = 100
      this._currentValue = 0
      this._modelChanged = new eventDispatcher(this)
    }
    valueCalculation(position: number, trackWidth: number) {
      this._currentValue = Math.round((position*(this._end - this._start))/trackWidth);
      this.callCommand(position, this._currentValue);
      return this;
    }
    callCommand(position: number, value: number) {
      this._modelChanged.notify({newPos: position, newValue: value})
    }
  } 