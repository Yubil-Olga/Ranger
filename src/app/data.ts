import { IOptions } from './options'

export default class Data {
    private _value: string
    private _coord: number
    constructor(i: number, options: IOptions) {
        if (options.values) {
            this._value = options.values[i].toString(),
            this._coord = i*100/(options.values.length - 1)
        }
        else {
            const step = this.calculateStep(options)
            this._value = (options.start + i*step).toString(),
            this._coord = i*step*100/(options.end - options.start) 
        }
    }
    get value() {
        return this._value
    }
    get coord() {
        return this._coord
    } 
    calculateStep(options: IOptions) {
        if (options.step*100/ (options.end - options.start) > 10 ) {
            return options.step
        }
        else {
            return (options.end - options.start)/2
        }
    }
    update(value: string, coord: number) {
        this._value = value
        this._coord = coord
    }
}