import eventDispatcher from './dispatcher'

export default class Model {
    // private _start: number
    // private _end: number
    private _start: any
    private _end: any
    private _step: number
    private _data: any
    private _modelChanged: any
    private _userValues: any
   
    constructor() {
      this._start = 0
      this._step = 1
      this._end = this._start + 100
      this._data = []
      this._modelChanged = new eventDispatcher(this)
      this._userValues = []
    }

    init(options: any) {
      this._start = options.start
      this._end = options.end
      this._step = options.step

      // if (options.to > options.start) {
      //   this._currentValue = options.to
      //   let position = ((this._currentValue - this._start)/(this._end - this._start))*100;
      //   this.callCommand(position , options.to)
      // }
      if (options.values && options.values.length>1) {
        this._userValues = options.values
        let num = 1
        if (options.type === 'double') {
          num = 2
        }
        for (let i=0; i<num; i++) {
          this._data[i] = {
            value: this._userValues[i].toString(),
            coord: i*100/(options.values.length - 1)
          }
        }
      }
      else  if (options.type === 'double' && !options.values) {
        let type = 2
        let num = Math.round(((this._end - this._start)/this._step)/2)
        console.log(num)
        for (let i=0; i<type; i++) {
          this._data[i] = {
            
            value: this._start + i*num*this._step,
            coord: i*num*this._step*100/(this._end - this._start)
          }
        }
          // this._data[0] = {
          //   value: this._start + this._step,
          //   coord: 10
          // }
          // this._data[1] = {
          //   value: this._end - this._step,
          //   coord: 90
          // } 
        }
        else {
        this._data[0] = {
          value : this._start,
          coord: 0
        }
      }   

      this.callCommand(this._data)
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
    valueCalculation(position: number, trackWidth: number, index: number) {
      if (this._userValues.length > 0) {
        let step = 100/(this._userValues.length - 1);
        let pos = this.positionCalculation(position, step, trackWidth);
        this._data[index].value = this._userValues[pos/step]
        this._data[index].coord = pos;
        this.callCommand(this._data);
      }
      else {
        let step = this.stepCalculation();
        let pos = this.positionCalculation(position, step, trackWidth);
        this._data[index].value = Math.round(pos*(this._end - this._start)/100 + this._start);
        this._data[index].coord = pos;
        this.callCommand(this._data);
      }
      
      return this._data;
    }
    
    callCommand(data: any) {
      this._modelChanged.notify(data)
    }
  } 