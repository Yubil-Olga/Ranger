import eventDispatcher from './dispatcher'

export default class Model {
    private _start: number
    private _end: number
    private _step: number
    private _currentValue: number
    private _modelChanged: any
    constructor() {
      this._start = 0
      this._step = 1
      this._end = 100
      this._currentValue = 0
      this._modelChanged = new eventDispatcher(this)
    }
    init(options: any) {
      this._start = options.start
      this._end = options.end
      this._step = options.step
      if (options.to > options.start) {
        this._currentValue = options.to
        let position = ((this._currentValue - this._start)/(this._end - this._start))*100;
        this.callCommand(position , options.to)
      }
    }
    stepCalculation() {
      let step = (this._step/(this._end - this._start))*100
      return step
    }
    positionCalculation(position: number, step: number, trackWidth:number) {
      let percent = position/trackWidth
      let pos = Math.round((percent*100)/step)*step;
      return pos
    }
    valueCalculation(position: number, trackWidth: number) {
      let step = this.stepCalculation();
      let pos = this.positionCalculation(position, step, trackWidth);
      this._currentValue = Math.round(pos*(this._end - this._start)/100 + this._start);
      this.callCommand(pos, this._currentValue);
      return this._currentValue;
    }
    
    callCommand(position: number, value: number) {
      this._modelChanged.notify({newPos: position, newValue: value})
    }
  } 