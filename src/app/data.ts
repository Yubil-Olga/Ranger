export default class Data {
    private _value: string
    private _coord: number
    constructor(i: number, options: any) {
        if (options.values) {
            this._value = options.values[i].toString(),
            this._coord = i*100/(options.values.length - 1)
        }
        else {
            this._value = (options.start + i*options.step).toString(),
            this._coord = i*options.step*100/(options.end - options.start) 
        }
    }
    get value() {
        return this._value
    }
    get coord() {
        return this._coord
    } 
    update(value: string, coord: number) {
        this._value = value
        this._coord = coord
    }
}