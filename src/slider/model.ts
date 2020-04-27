import eventDispatcher from './dispatcher'
import Data from './data'

export default class Model {
    private _options: any
    private _data: any
    private _modelChanged: any
   
    constructor() {
      this._data = []
      this._modelChanged = new eventDispatcher(this)
    }

    init(options: any) {
      this._options = options
      for (let i=0; i<options.type; i++) {
        let data = new Data(i, this._options)
        this._data.push(data)
      }
      this.callCommand(this._data)
    }

    stepCalculation() {
      let step = (this._options.step/(this._options.end - this._options.start))*100
      return step
    }
    positionCalculation(position: number, step: number, trackWidth:number) {
      let percent = (position/trackWidth)*100
      let pos: number
      if ((percent + step) > 100) {
        pos = 100
      }
      else {
        pos = Math.round(percent/step)*step;
      }
      return pos
    }
    valueCalculation(position: number, trackWidth: number, index: number) {
      if (this._options.values) {
        let step = 100/(this._options.values.length - 1);
        let pos = this.positionCalculation(position, step, trackWidth);
        this._data[index].value = this._options.values[pos/step]
        this._data[index].coord = pos;
      }
      else {
        let step = this.stepCalculation();
        let pos = this.positionCalculation(position, step, trackWidth);
        this._data[index].value = Math.round(pos*(this._options.end - this._options.start)/100 + this._options.start);
        this._data[index].coord = pos;
      }
      this.callCommand(this._data);
      return this._data;
    }
    
    callCommand(data: any) {
      this._modelChanged.notify(data)
    }
  } 